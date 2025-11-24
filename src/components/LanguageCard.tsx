import { useTheme } from '@shopify/restyle';
import i18next from 'i18next';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import type { Theme } from '../styles/globalTheme/theme';
import LanguageSelectModal from './ui/LanguageSelectModal';
import { createLanguageCardStyles } from './styles/LanguageCard.styles.ts';

interface Props {
  activeDropdown: string | null;
  setActiveDropdown: (key: string | null) => void;
}

const LanguageCard: React.FC<Props> = ({
  activeDropdown,
  setActiveDropdown,
}) => {
  const theme = useTheme<Theme>();
  const styles = createLanguageCardStyles(theme);

  const key = 'language';
  const [value, setValue] = useState(i18next.language);

  const { t } = useTranslation();

  useEffect(() => {
    setValue(i18next.language);
  }, []);

  const items = [
    { label: 'Polski', value: 'pl' },
    { label: 'English', value: 'en' },
  ];

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.leftSection}>
          <Text style={styles.label}>{t('language')}</Text>
        </View>
        <View style={styles.dropdownContainer}>
          <LanguageSelectModal
            controlKey={key}
            activeKey={activeDropdown}
            setActiveKey={setActiveDropdown}
            items={items}
            value={value}
            onChange={val => {
              setValue(val);
              i18next.changeLanguage(val);
            }}
            placeholder={t('selectLanguage') || 'Select language'}
          />
        </View>
      </View>
    </View>
  );
};

export default React.memo(LanguageCard);
