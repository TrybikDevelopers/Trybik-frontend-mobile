import { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {
  useSettingsStore,
  useSettingsActions,
} from '../../store/settingsStore';
import type { GroupKey, GroupName } from '../../store/settingsStoreTypes';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@shopify/restyle';
import type { Theme } from '../../styles/globalTheme/theme';

interface Props {
  groupTitle: string;
  groupName: GroupName;
  activeDropdown: string | null;
  setActiveDropdown: (key: string | null) => void;
  isOffline: boolean;
  hasError?: boolean;
}

const groupKeyMap: Record<GroupName, GroupKey> = {
  GG: 'dean',
  K: 'comp',
  L: 'lab',
  P: 'proj',
} as const;

const createGroupSelectStyles = (theme: Theme, hasError: boolean) => {
  const { colors } = theme;

  return StyleSheet.create({
    text: {
      color: colors.textPrimary,
      fontSize: 14,
      marginBottom: 4,
    },
    dropDownContainer: {
      backgroundColor: colors.Foreground,
      borderColor: colors.border,
    },
    dropDown: {
      backgroundColor: colors.Foreground,
      borderColor: hasError ? colors.error : colors.border,
      borderWidth: hasError ? 2 : 1,
    },
    container: {
      width: 130,
      zIndex: 1000,
      elevation: 4,
    },
    containerOpen: {
      zIndex: 8000,
      elevation: 20,
    },
    textStyle: {
      color: colors.textPrimary,
    },
    searchTextInput: {
      color: colors.textPrimary,
    },
    searchContainer: {
      backgroundColor: colors.Foreground,
    },
    openDropDownContainer: {
      zIndex: 8000,
      elevation: 20,
    },
    iconContainer: {
     zIndex: 9000,
     elevation: 20
    },
  });
};

const GroupSelectDropdown: React.FC<Props> = ({
  groupTitle,
  groupName,
  activeDropdown,
  setActiveDropdown,
  hasError = false,
  isOffline,
}) => {
  const theme = useTheme<Theme>();
  const styles = createGroupSelectStyles(theme, hasError);

  const key = groupKeyMap[groupName];
  const { fetchInitialDeanGroups } = useSettingsActions();
  const groups = useSettingsStore(state => state.groups);
  const options = useSettingsStore(state => state.options[key]);
  const setGroup = useSettingsActions().setGroup;
  const { t } = useTranslation();

  const [value, setValue] = useState(groups[key] || '');
  const [items, setItems] = useState(
    (options || []).map(opt => ({ label: opt, value: opt })),
  );

  useEffect(() => {
    setItems((options || []).map(opt => ({ label: opt, value: opt })));
  }, [options]);

  useEffect(() => {
    if (key === 'dean' && (!options || options.length === 0)) {
      fetchInitialDeanGroups();
    }
  }, [key, options, fetchInitialDeanGroups]);

  useEffect(() => {
    setValue(groups[key] || '');
  }, [groups, key]);

  const open = activeDropdown === key;

  return (
    <View style={[styles.container, open && styles.containerOpen]}>
      {groupTitle && <Text style={styles.text}>{groupTitle}</Text>}

      <DropDownPicker
        disabled={isOffline}
        open={open}
        value={value}
        items={items}
        // Raise z-index only while open, so multiple dropdowns stack correctly
        zIndex={open ? 8000 : 1000}
        zIndexInverse={open ? 1000 : 8000}
        setOpen={openValue => {
          const isOpen =
            typeof openValue === 'function' ? openValue(open) : openValue;
          setActiveDropdown(isOpen ? key : null);
        }}
        setValue={val => {
          const newValue = typeof val === 'function' ? val(value) : val;
          setValue(newValue);
          setGroup(key, newValue);
        }}
        setItems={setItems}
        listItemContainerStyle={styles.iconContainer}
        placeholder={t('groupSelectPlaceholder')}
        searchable
        searchPlaceholder={t('searchPlaceholder')}
        dropDownContainerStyle={[
          styles.dropDownContainer,
          open && styles.openDropDownContainer,
        ]}
        containerStyle={styles.container}
        style={styles.dropDown}
        textStyle={styles.textStyle}
        searchTextInputStyle={styles.searchTextInput}
        searchContainerStyle={styles.searchContainer}
      />
    </View>
  );
};

export default GroupSelectDropdown;
