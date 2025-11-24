import React from 'react';
import { useTranslation } from 'react-i18next';
import Switch from '../../../../components/ui/Switch.tsx';
import { useSettingsStore } from '../../../../store/settingsStore.ts';

// Optimized switch component factory
export const createSwitchComponent = (
  stateSelector: (state: any) => boolean,
  actionSelector: (state: any) => (value: boolean) => void,
  translationKey: string,
) => () => {
  const value = useSettingsStore(stateSelector);
  const setValue = useSettingsStore(actionSelector);
  const { t } = useTranslation();

  return <Switch label={t(translationKey)} value={value} onChange={setValue} />;
};

// Theme toggle is special case since it uses different logic
export const ToggleTheme = () => {
  const currentTheme = useSettingsStore(state => state.themeMode);
  const toggleTheme = useSettingsStore(state => state.actions.toggleMode);
  const { t } = useTranslation();

  return (
    <Switch
      label={t('toggleThemeText')}
      value={currentTheme === 'dark'}
      onChange={toggleTheme}
    />
  );
};

// Create optimized switch components
export const ShowEmptySlotsToggle = createSwitchComponent(
  state => state.showEmptySlots,
  state => state.actions.setShowEmptySlots,
  'freeHoursText',
);

export const ShowLectures = createSwitchComponent(
  state => state.showLectures,
  state => state.actions.setShowLectures,
  'showLectures',
);