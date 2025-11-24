import { VEXO_KEY } from '@env';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import { ThemeProvider } from '@shopify/restyle';
import { useEffect, useState } from 'react';
import { I18nextProvider } from 'react-i18next';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { vexo } from 'vexo-analytics';
import i18n from './i18n';
import FirstTimeSetupScreen from './src/app/main/FirstTimeSetupScreen';
import TabNavigator from './src/app/tabs/tabNavigator';
import UpdateAlertModal from './src/components/modals/UpdateAlertModal';
import { getLatestVersion } from './src/services/versionService';
import { useSettingsStore } from './src/store/settingsStore';
import { compareVersions } from './src/utils/compareVersions';
import { getAppVersion } from './src/utils/getAppVersion';

type RootStackParamList = {
  Settings: undefined;
  Home: undefined;
  Tabs: undefined;
};

const App = () => {
  const isSetupComplete = useSettingsStore(state => state.setupComplete);
  const currentAppTheme = useSettingsStore(state => state.theme);
  const themeMode = useSettingsStore(state => state.themeMode);

  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [currentVersion, setCurrentVersion] = useState('');
  const [latestVersion, setLatestVersion] = useState('');

  const navigationRef = useNavigationContainerRef<RootStackParamList>();

  vexo(VEXO_KEY);

  const handleSetupDone = () => {
    useSettingsStore.getState().setupComplete = true;
  };

  useEffect(() => {
    if (navigationRef.isReady()) {
      navigationRef.navigate('Settings');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [themeMode]);

  useEffect(() => {
    i18n.init();

    const checkVersion = async () => {
      try {
        const current = getAppVersion();
        const latest = await getLatestVersion();

        setCurrentVersion(current);
        setLatestVersion(latest);

        if (compareVersions(current, latest) < 0) {
          setUpdateModalVisible(true);
        }
      } catch (err) {
        console.error('Version check failed:', err);
      }
    };

    checkVersion();
  }, []);

  return (
    <SafeAreaProvider>
      <I18nextProvider i18n={i18n}>
        <ThemeProvider theme={currentAppTheme}>
          <NavigationContainer ref={navigationRef}>
            {!isSetupComplete ? (
              <FirstTimeSetupScreen onDone={handleSetupDone} />
            ) : (
              <TabNavigator />
            )}
          </NavigationContainer>

          <UpdateAlertModal
            visible={updateModalVisible}
            currentVersion={currentVersion}
            latestVersion={latestVersion}
            onClose={() => setUpdateModalVisible(false)}
          />
        </ThemeProvider>
      </I18nextProvider>
    </SafeAreaProvider>
  );
};

export default App;
