import { useTheme } from '@shopify/restyle';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, TouchableOpacity, View } from 'react-native';
import GroupSelect from '../../components/ui/GroupSelectModal';
import {
  useSettingsActions,
  useSettingsStore,
} from '../../store/settingsStore';
import { Theme } from '../../styles/globalTheme/theme';
import { createSetupStyles } from './FirstTimeSetupScreen.styles';

export default function FirstTimeSetupScreen({
  onDone,
}: {
  onDone: () => void;
}) {
  const { t } = useTranslation();
  const theme = useTheme<Theme>();
  const styles = createSetupStyles(theme);

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<Set<string>>(
    new Set(),
  );
  const [showErrors, setShowErrors] = useState(false);

  const groups = useSettingsStore(state => state.groups);
  const options = useSettingsStore(state => state.options);
  const { fetchDependentGroups, setSetupComplete, fetchInitialDeanGroups } =
    useSettingsActions();

  useEffect(() => {
    fetchInitialDeanGroups();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hasLPKGroups =
    options.lab.length > 0 ||
    options.proj.length > 0 ||
    options.comp.length > 0;

  const validateGroups = () => {
    const errors = new Set<string>();
    if (!groups.dean) errors.add('dean');
    if (hasLPKGroups) {
      if (options.lab.length > 0 && !groups.lab) errors.add('lab');
      if (options.proj.length > 0 && !groups.proj) errors.add('proj');
      if (options.comp.length > 0 && !groups.comp) errors.add('comp');
    }
    setValidationErrors(errors);
    return errors.size === 0;
  };

  const handleContinue = async () => {
    setShowErrors(true);
    if (!validateGroups()) return;

    await fetchDependentGroups(groups.dean!);
    setSetupComplete(true);
    onDone();
  };

  const hasError = (groupKey: string) => validationErrors.has(groupKey);

  return (
    <View style={styles.container}>
      <View style={styles.labelsContainer}>
        <Text style={styles.title}>{t('welcomeText')}</Text>
        <Text style={styles.subtitle}>{t('selectGroupText')}</Text>

          {showErrors && validationErrors.size > 0 && (
            <Text style={styles.errorText}>{t('selectGroupText')}</Text>
          )}
        
      </View>

      <View style={styles.dropdownContainer}>
        <View style={styles.selectWrapper}>
          <GroupSelect
            groupTitle="Grupa Dziekańska"
            groupName="GG"
            activeDropdown={activeDropdown}
            setActiveDropdown={setActiveDropdown}
            hasError={hasError('dean')}
            isOffline={false}
          />
        </View>
        {groups.dean && (
          <>
            {options.lab.length !== 0 && (
              <View style={styles.selectWrapper}>
                <GroupSelect
                  groupTitle="Grupa Laboratoryjna"
                  groupName="L"
                  activeDropdown={activeDropdown}
                  setActiveDropdown={setActiveDropdown}
                  hasError={hasError('lab')}
                  isOffline={false}
                />
              </View>
            )}
            {options.comp.length !== 0 && (
              <View style={styles.selectWrapper}>
                <GroupSelect
                  groupTitle="Grupa Komputerowa"
                  groupName="K"
                  activeDropdown={activeDropdown}
                  setActiveDropdown={setActiveDropdown}
                  hasError={hasError('comp')}
                  isOffline={false}
                />
              </View>
            )}
            {options.proj.length !== 0 && (
              <View style={styles.selectWrapper}>
                <GroupSelect
                  groupTitle="Grupa Projektowa"
                  groupName="P"
                  activeDropdown={activeDropdown}
                  setActiveDropdown={setActiveDropdown}
                  hasError={hasError('proj')}
                  isOffline={false}
                />
              </View>
            )}
          </>
        )}
      </View>

      <TouchableOpacity
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          ...styles.confirmButton,
          display: groups.dean ? 'flex' : 'none',
        }}
        onPress={handleContinue}
      >
        <Text style={styles.confirmButtonText}>{t('confirmButton')}</Text>
      </TouchableOpacity>
    </View>
  );
}