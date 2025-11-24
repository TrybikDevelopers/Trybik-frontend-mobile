import { createTheme } from '@shopify/restyle';
import spacing from './stylesDefinitions/spacing';
import palette from './stylesDefinitions/basePalette';

const activityLegendColors = {
  lecture: '#e35c22',
  excercise: '#82d32e',
  laboratory: '#3abee5',
  computerLaboratory: '#cf2eee',
  project: '#d22e2e',
  seminar: '#aaaa14',
  other: '#6e6e6e',
};

const baseConfig = {
  spacing,
  activityLegendColors,
  borderRads: {
    xs: 2,
    s: 4,
    m: 8,
    l: 16,
  },
  breakpoints: {},
};

export const darkTheme = createTheme({
  ...baseConfig,
  colors: {
    Background: palette.darkColors.black,
    secondaryForeground: palette.darkColors.lightGray,
    Foreground: palette.darkColors.darkGray,
    textPrimary: palette.darkColors.white,
    textContrast: palette.darkColors.black,
    themeOpposite: palette.darkColors.white,
    textSecondary: palette.darkColors.brightGray,
    error: palette.accentColors.brightRed,
    border: palette.darkColors.gray,
    border2: palette.darkColors.gray,
    calculatorBackgroundHeader: palette.darkColors.pureBlack,

    selectedAccent: palette.accentColors.wmcolor,
    confirmAccent: palette.accentColors.wmcolor,
    cancelAccent: palette.accentColors.red,
    confirmAccent2: palette.darkColors.lightGray2,
    cancelAccent2: palette.darkColors.darkGray2,

    userInput: palette.darkColors.darkGray2,
    selectedItemBackground: palette.darkColors.white,
    textDisabled: palette.calendarThemeColors.textDisabledDark,

    separator: palette.timetableThemeColors.separatorDark,
    dayTitle: palette.timetableThemeColors.dayTitleLight,

    navButton: palette.darkColors.gray,
    navButtonIcon: palette.timetableThemeColors.arrowLight,

    headerBg: palette.darkColors.black,
    tabBarInactiveTintColor: palette.darkColors.white,
    tabBarActiveTintColor: palette.accentColors.wmcolor,

    settingsBackground: palette.SettingsScreenColors.elementsBackgroundDark,
    switchOnBg: palette.darkColors.gray,

    otpBg: palette.darkColors.gray,
    otpFilledBg: palette.darkColors.gray,
  },
});

export const lightTheme = createTheme({
  ...baseConfig,
  colors: {
    Background: palette.lightColors.mutedTeal,
    secondaryForeground: palette.lightColors.white,
    Foreground: palette.lightColors.white,
    textPrimary: palette.lightColors.black,
    textContrast: palette.lightColors.black,
    themeOpposite: palette.darkColors.black,
    textSecondary: palette.darkColors.brightGray,
    error: palette.accentColors.brightRed,
    border: palette.lightColors.lightTeal,
    border2: palette.lightColors.mutedTeal,
    calculatorBackgroundHeader: palette.lightColors.mutedTeal,

    selectedAccent: palette.accentColors.wmcolor,
    confirmAccent: palette.accentColors.wmcolor,
    cancelAccent: palette.accentColors.red,
    confirmAccent2: palette.lightColors.lightTeal2,
    cancelAccent2: palette.lightColors.white,

    userInput: palette.lightColors.white,
    selectedItemBackground: palette.lightColors.white,
    textDisabled: palette.calendarThemeColors.textDisabledLight,

    separator: palette.timetableThemeColors.separatorLight,
    dayTitle: palette.timetableThemeColors.dayTitleDark,

    navButton: palette.lightColors.lightTeal,
    navButtonIcon: palette.timetableThemeColors.arrowDark,

    headerBg: palette.headerThemeColors.lightBackground,
    tabBarInactiveTintColor: palette.darkColors.paleGray,
    tabBarActiveTintColor: palette.accentColors.wmcolor,

    settingsBackground: palette.SettingsScreenColors.elementsBackgroundLight,
    switchOnBg: palette.accentColors.mutedPurple,

    otpBg: palette.lightColors.lightTeal,
    otpFilledBg: palette.accentColors.mutedPurple,
  },
});

export type Theme = typeof darkTheme;
