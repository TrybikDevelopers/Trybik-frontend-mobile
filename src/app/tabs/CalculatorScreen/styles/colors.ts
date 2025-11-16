import { Theme } from '../../../../styles/globalTheme/theme';

export const buildCalculatorColors = (theme: Theme) => ({
  backgroundPrimary: theme.colors.Foreground,
  backgroundSecondary: theme.colors.userInput,
  backgroundSelectItem: theme.colors.themeOpposite,
  backgroundItem: theme.colors.border,
  backgroundPopup: theme.colors.Foreground,
  backgroundHeader: theme.colors.border2,
  overlay: 'rgba(0, 0, 0, 0.5)',
  borderDefault: theme.colors.border,
  borderLight: theme.colors.themeOpposite,
  borderError: theme.colors.error,
  borderGray: theme.colors.border,
  cancelButtonBorder: theme.colors.border,
  accentBlue: theme.colors.confirmAccent,
  accentRed: theme.colors.cancelAccent,
  accentRedTransparent: theme.colors.cancelAccent + 'ea',
  accentBlueTransparent: theme.colors.confirmAccent + 'b6',
  textPrimary: theme.colors.textPrimary,
  textSecondary: theme.colors.textSecondary,
  textContrast: theme.colors.Foreground,
  textError: theme.colors.error,
  confirmButtonBg: theme.colors.confirmAccent2,
  cancelButtonBg: theme.colors.cancelAccent2,
});

export type CalculatorColors = ReturnType<typeof buildCalculatorColors>;
