import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Modal,
  TextInput,
  FlatList,
} from 'react-native';
import { useTheme } from '@shopify/restyle';
import type { Theme } from '../../styles/globalTheme/theme';
import { useTranslation } from 'react-i18next';
import {
  useSettingsActions,
  useSettingsStore,
} from '../../store/settingsStore';
import type { GroupKey, GroupName } from '../../store/settingsStoreTypes';

const emptyStyles = StyleSheet.create({
  container: { padding: 16, alignItems: 'center' },
  text: { opacity: 0.7 },
});

const EmptyList: React.FC<{ text: string }> = ({ text }) => (
  <View style={emptyStyles.container}>
    <Text style={emptyStyles.text}>{text}</Text>
  </View>
);

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

const createStyles = (theme: Theme, hasError: boolean) => {
  const { colors } = theme;
  return StyleSheet.create({
    modalContainer: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      height: '100%',
      gap: 6,
    },
    labelContainer: {
      justifyContent: 'flex-end',
      height: 'auto',
    },
    label: {
      color: colors.textPrimary,
      fontSize: 14,
    },
    control: {
      display: 'flex',
      width: '100%',
      height: '50%',
      borderRadius: 8,
      backgroundColor: colors.Foreground,
      borderWidth: hasError ? 2 : 1,
      borderColor: hasError ? colors.error : colors.border,
      justifyContent: 'center',
      alignItems: 'center',
    },
    controlText: {
      color: colors.textPrimary,
    },
    modalBackdrop: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'center',
      padding: 16,
    },
    modalCard: {
      backgroundColor: colors.Foreground,
      borderRadius: 12,
      padding: 12,
      maxHeight: '80%',
    },
    search: {
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 8,
      paddingHorizontal: 10,
      paddingVertical: 8,
      color: colors.textPrimary,
      marginBottom: 8,
      backgroundColor: colors.Foreground,
    },
    item: {
      paddingVertical: 12,
      paddingHorizontal: 8,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.border,
    },
    itemText: {
      color: colors.textPrimary,
    },
    empty: {
      padding: 16,
      alignItems: 'center',
    },
    emptyText: {
      color: colors.textPrimary,
      opacity: 0.7,
    },
  });
};

const GroupSelectModal: React.FC<Props> = ({
  groupTitle,
  groupName,
  activeDropdown: _activeDropdown,
  setActiveDropdown,
  isOffline,
  hasError = false,
}) => {
  const theme = useTheme<Theme>();
  const styles = createStyles(theme, hasError);
  const { t } = useTranslation();

  const key = groupKeyMap[groupName];
  const { fetchInitialDeanGroups, setGroup } = useSettingsActions();
  const groups = useSettingsStore(state => state.groups);
  const options = useSettingsStore(state => state.options[key] || []);

  const [visible, setVisible] = useState(false);
  const [search, setSearch] = useState('');
  const [value, setValue] = useState(groups[key] || '');

  useEffect(() => {
    setValue(groups[key] || '');
  }, [groups, key]);

  useEffect(() => {
    if (key === 'dean' && options.length === 0) {
      fetchInitialDeanGroups();
    }
  }, [key, options, fetchInitialDeanGroups]);

  const filtered = useMemo(() => {
    const s = search.trim().toLowerCase();
    if (!s) return options;
    return options.filter(o => o.toLowerCase().includes(s));
  }, [options, search]);

  const openModal = () => {
    if (isOffline) return;
    setActiveDropdown(key);
    setVisible(true);
  };

  const closeModal = () => {
    setVisible(false);
    setActiveDropdown(null);
    setSearch('');
  };

  const onSelect = (val: string) => {
    setValue(val);
    setGroup(key, val);
    closeModal();
  };

  const placeholderText = t('groupSelectPlaceholder');

  return (
    <View style={styles.modalContainer}>
      {groupTitle ? (
        <View style={styles.labelContainer}>
          <Text style={styles.label}>{groupTitle}</Text>
        </View>
      ) : null}

      <Pressable
        onPress={openModal}
        disabled={isOffline}
        style={({ pressed }) => [
          styles.control,
          pressed && { opacity: 0.9 },
          !groupTitle && { height: '100%' },
        ]}
      >
        <Text style={styles.controlText} numberOfLines={1}>
          {value || placeholderText}
        </Text>
      </Pressable>

      <Modal
        visible={visible}
        animationType="fade"
        transparent
        onRequestClose={closeModal}
      >
        <Pressable style={styles.modalBackdrop} onPress={closeModal}>
          <Pressable style={styles.modalCard} onPress={() => {}}>
            <TextInput
              placeholder={t('searchPlaceholder')}
              placeholderTextColor="#888"
              value={search}
              onChangeText={setSearch}
              style={styles.search}
              autoFocus
            />
            <FlatList
              keyboardShouldPersistTaps="handled"
              data={filtered}
              keyExtractor={item => item}
              renderItem={({ item }) => (
                <Pressable style={styles.item} onPress={() => onSelect(item)}>
                  <Text style={styles.itemText}>{item}</Text>
                </Pressable>
              )}
              ListEmptyComponent={
                <EmptyList text={t('noResults') || 'No results'} />
              }
            />
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
};

export default GroupSelectModal;
