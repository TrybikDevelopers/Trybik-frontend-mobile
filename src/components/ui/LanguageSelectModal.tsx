import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, Pressable, Modal, TextInput, FlatList } from 'react-native';
import { useTheme } from '@shopify/restyle';
import type { Theme } from '../../styles/globalTheme/theme';
import { useTranslation } from 'react-i18next';

export type LanguageItem = { label: string; value: string };

interface Props {
  controlKey: string;
  activeKey: string | null;
  setActiveKey: (key: string | null) => void;
  items: LanguageItem[];
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

const createStyles = (theme: Theme) => {
  const { colors } = theme;
  return StyleSheet.create({
    root: {
      width: 130,
    },
    control: {
      width: '100%',
      paddingVertical: 10,
      paddingHorizontal: 12,
      borderRadius: 8,
      backgroundColor: colors.Foreground,
      borderWidth: 1,
      borderColor: colors.border,
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
  });
};

const LanguageSelectModal: React.FC<Props> = ({
  controlKey,
  activeKey,
  setActiveKey,
  items,
  value,
  onChange,
  placeholder,
  disabled,
}) => {
  const theme = useTheme<Theme>();
  const styles = createStyles(theme);
  const { t } = useTranslation();

  const [visible, setVisible] = useState(false);
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    const s = search.trim().toLowerCase();
    if (!s) return items;
    return items.filter(o =>
      o.label.toLowerCase().includes(s) || o.value.toLowerCase().includes(s),
    );
  }, [items, search]);

  const selectedLabel = useMemo(() => {
    return items.find(i => i.value === value)?.label ?? value;
  }, [items, value]);

  const open = activeKey === controlKey;

  const openModal = () => {
    if (disabled) return;
    setActiveKey(controlKey);
    setVisible(true);
  };

  const closeModal = () => {
    setVisible(false);
    setActiveKey(null);
    setSearch('');
  };

  const onSelect = (val: string) => {
    onChange(val);
    closeModal();
  };

  return (
    <View style={styles.root}>
      <Pressable
        onPress={openModal}
        disabled={disabled}
        style={({ pressed }) => [styles.control, pressed && { opacity: 0.9 }]}
      >
        <Text style={styles.controlText} numberOfLines={1}>
          {selectedLabel || placeholder || t('selectLanguage') || 'Select language'}
        </Text>
      </Pressable>

      <Modal visible={open && visible} animationType="fade" transparent onRequestClose={closeModal}>
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
              keyExtractor={item => item.value}
              renderItem={({ item }) => (
                <Pressable style={styles.item} onPress={() => onSelect(item.value)}>
                  <Text style={styles.itemText}>{item.label}</Text>
                </Pressable>
              )}
            />
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
};

export default LanguageSelectModal;
