import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';

import TimetableScreen from './TimetableScreen/TimetableScreen';
import CalendarScreen from './CalendarScreen/CalendarScreen';
import CalculatorScreen from './CalculatorScreen/CalculatorScreen';
import SettingsScreen from './SettingsScreen/SettingsScreen';
import { HEADER_HEIGHT, TAB_BAR_HEIGHT } from '../../constants/constants';

import HeaderLogoLight from '../../assets/svg/HeaderLogoWhite.svg';
import HeaderLogoDark from '../../assets/svg/HeaderLogoBlack.svg';
import { StyleSheet, useWindowDimensions } from 'react-native';
import { ActivityLegend } from '../../components/ActivityLegend';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@shopify/restyle';
import { Theme } from '../../styles/globalTheme/theme';
import { tabNavigatorStyles } from './tabNavigatorStyles';
import { useSettingsStore } from '../../store/settingsStore';
import type { SettingsState } from '../../store/settingsStoreTypes';

const Tab = createBottomTabNavigator();

const NavigationStyles = StyleSheet.create({
  HeaderLogoPortrait: {
    marginLeft: 15,
  },
  HeaderLogoLandscape: {
    marginLeft: 5,
  },
});

const getScreenOptions = (
  insets: any,
  styles: ReturnType<typeof tabNavigatorStyles>,
  themeMode: SettingsState['themeMode'],
  isLandscape: boolean,
  logoWidth: number,
  logoHeight: number,
) => ({
  headerShown: true,
  headerTitle: () =>
    themeMode === 'dark' ? (
      <HeaderLogoLight
        width={logoWidth}
        height={logoHeight}
        style={
          isLandscape
            ? NavigationStyles.HeaderLogoLandscape
            : NavigationStyles.HeaderLogoPortrait
        }
      />
    ) : (
      <HeaderLogoDark
        width={logoWidth}
        height={logoHeight}
        style={NavigationStyles.HeaderLogoPortrait}
      />
    ),
  tabBarActiveTintColor: styles.tabBarActiveTintColor,
  tabBarInactiveTintColor: styles.tabBarInactiveTintColor,
  tabBarInactiveBackgroundColor: styles.mainBg,
  tabBarActiveBackgroundColor: styles.mainBg,

  headerStyle: {
    backgroundColor: styles.mainBg,
    height: isLandscape ? HEADER_HEIGHT * 0.5 : HEADER_HEIGHT,
    paddingTop: insets.top,
  },

  headerTitleStyle: {
    color: '#FFFFFF',
  },

  tabBarStyle: {
    height: isLandscape
      ? (TAB_BAR_HEIGHT + insets.bottom) * 0.7
      : TAB_BAR_HEIGHT + insets.bottom,
    paddingBottom: insets.bottom > 0 ? 10 : 15,
    paddingTop: 10,
    backgroundColor: styles.mainBg,
    borderTopWidth: 0,
  },

  tabBarLabelStyle: {
    fontSize: 10,
    fontFamily: 'InterMedium',
    marginBottom: 2,
  },

  tabBarIconStyle: {
    marginTop: 0,
  },
});

const renderTimetableIcon = ({
  color,
  size,
}: {
  color: string;
  size: number;
}) => <Icon name="view-list" color={color} size={size} />;

const renderCalendarIcon = ({
  color,
  size,
}: {
  color: string;
  size: number;
}) => <Icon name="calendar-month" color={color} size={size} />;

const renderCalcIcon = ({ color, size }: { color: string; size: number }) => (
  <Icon name="calculate" color={color} size={size} />
);

const renderSettingsIcon = ({
  color,
  size,
}: {
  color: string;
  size: number;
}) => <Icon name="settings" color={color} size={size} />;

const TabNavigator: React.FC = () => {
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();

  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  // Logo dimensions
  const logoWidth = isLandscape ? width * 0.2 : width * 0.47;
  const logoHeight = isLandscape ? height * 0.08 : height * 0.12;

  // style initialization
  const theme = useTheme<Theme>();
  const styles = tabNavigatorStyles(theme);
  const themeMode = useSettingsStore(state => state.themeMode);

  return (
    <Tab.Navigator
      screenOptions={getScreenOptions(
        insets,
        styles,
        themeMode,
        isLandscape,
        logoWidth,
        logoHeight,
      )}
    >
      <Tab.Screen
        name="timetable"
        component={TimetableScreen}
        options={{
          tabBarLabel: t('timetable'),
          tabBarIcon: renderTimetableIcon,
          //eslint-disable-next-line  react/no-unstable-nested-components
          headerRight: () => <ActivityLegend />,
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{
          tabBarLabel: t('calendar'),
          tabBarIcon: renderCalendarIcon,
        }}
      />
      <Tab.Screen
        name="ECTS Calculator"
        component={CalculatorScreen}
        options={{
          tabBarLabel: t('ECTSCalc'),
          tabBarIcon: renderCalcIcon,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: t('settings'),
          tabBarIcon: renderSettingsIcon,
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
