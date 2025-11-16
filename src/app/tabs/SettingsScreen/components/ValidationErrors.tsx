import React from 'react';
import { Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { styles } from './styles/ValidationErrors.styles.ts';

/**
 * Displays a concise validation message when required student groups
 * have not been selected on the Settings screen.
 */
interface ValidationErrorsProps {
  /** True when any required group is missing. */
  hasErrors: boolean;
}

export const ValidationErrors = ({ hasErrors }: ValidationErrorsProps) => {
  const { t } = useTranslation();
  
  if (!hasErrors) return null;

  return (
    <Text style={styles.text}>
      {t('selectRequiredGroups') || 'Proszę wybrać wszystkie wymagane grupy'}
    </Text>
  );
};