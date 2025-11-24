import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { View, Text, FlatList } from 'react-native';
import { useTheme } from '@shopify/restyle';
import { useTranslation } from 'react-i18next';
import Toast from 'react-native-toast-message';

import { createSettingsStyle } from './styles/SettingsScreen.styles.ts';
import { Theme } from '../../../styles/globalTheme/theme';
import { useSettingsStore } from '../../../store/settingsStore.ts';
import RepresentativeAuthModal from '../../../components/modals/RepresentativeAuthModal.tsx';
import { useAuthStore } from '../../../store/authStore.ts';
import { useTimetableStore } from '../../../store/timetableStore.ts';
import LanguageCard from '../../../components/LanguageCard.tsx';
import {
  ShowEmptySlotsToggle,
  ShowLectures,
  ToggleTheme,
} from './components/SwitchComponents';
import { ValidationErrors } from './components/ValidationErrors';
import { AuthenticationStatus } from './components/AuthenticationStatus.tsx';
import { GroupCards } from './components/GroupCards';

function SettingsScreen() {
  const options = useSettingsStore(state => state.options);
  const groups = useSettingsStore(state => state.groups);
  const [modalVisible, setModalVisible] = useState(false);
  const repGroup = useAuthStore(state => state.repGroup);
  const role = useAuthStore(state => state.role);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { isOffline } = useTimetableStore();
  const { t } = useTranslation();

  // Theme and styles
  const theme = useTheme<Theme>();
  const styles = useMemo(() => createSettingsStyle(theme), [theme]);

  // Validation logic
  const validationErrors = useMemo(() => {
    const errors = new Set<string>();

    if (!groups.dean) errors.add('dean');

    // Check LPK groups
    const hasLPKGroups =
      options.lab.length > 0 ||
      options.proj.length > 0 ||
      options.comp.length > 0;

    if (hasLPKGroups) {
      if (options.lab.length > 0 && !groups.lab) errors.add('lab');
      if (options.proj.length > 0 && !groups.proj) errors.add('proj');
      if (options.comp.length > 0 && !groups.comp) errors.add('comp');
    }

    return errors;
  }, [groups, options]);

  const hasError = useCallback(
    (groupKey: string) => validationErrors.has(groupKey),
    [validationErrors],
  );

  // Show success toast when validation passes
  const [wasValid, setWasValid] = useState<boolean | null>(null);
  const isValid = validationErrors.size === 0;

  useEffect(() => {
    if (isValid && wasValid === false) {
      Toast.show({
        type: 'success',
        text1: t('toastSaveMessage1'),
        text2: t('toastSaveMessage2'),
        visibilityTime: 2000,
      });
    }
    setWasValid(isValid);
  }, [isValid, wasValid, t]);

  // Rendered group cards
  const GroupCardRender = useMemo(
    () => (
      <View style={styles.cardsContainer}>
        <GroupCards
          options={options}
          isOffline={isOffline}
          activeDropdown={activeDropdown}
          setActiveDropdown={setActiveDropdown}
          hasError={hasError}
        />
      </View>
    ),
    [options, isOffline, activeDropdown, hasError, styles.cardsContainer],
  );

  return (
    <View style={styles.bgContainer}>
      <FlatList
        data={[]}
        renderItem={() => null}
        keyExtractor={() => 'dummy'}
        ListHeaderComponent={
          <View style={styles.container}>
            
            {/* Student Groups Section */}
            <ValidationErrors hasErrors={validationErrors.size > 0} />
            <Text style={styles.labelText}>
              {t('studentGroups') || 'Grupy Studenckie'}
            </Text>
            {GroupCardRender}

            {/* Toggles Section */}
            <View style={styles.togglesContainer}>
              <Text style={styles.labelText}>{t('displaySettings')}</Text>
              <ShowEmptySlotsToggle />
              <ShowLectures />
            </View>

            {/* Appearance Section */}
            <View style={styles.appearanceContainer}>
              {/* eslint-disable-next-line react-native/no-inline-styles */}
              <Text style={[styles.labelText, { marginTop: 30 }]}>
                {t('appApperance')}
              </Text>

              <LanguageCard
                activeDropdown={activeDropdown}
                setActiveDropdown={setActiveDropdown}
              />
              <ToggleTheme />
            </View>

            {/* Authentication Section */}
            <View style={styles.authenticationContainer}>
              <Text style={styles.labelText}>{t('appAuthentication')}</Text>
              <AuthenticationStatus
                role={role}
                repGroup={repGroup}
                onShowModal={() => setModalVisible(true)}
              />
            </View>
          </View>
        }
      />
      <RepresentativeAuthModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
      <Toast autoHide position="bottom" />
    </View>
  );
}

export default SettingsScreen;
