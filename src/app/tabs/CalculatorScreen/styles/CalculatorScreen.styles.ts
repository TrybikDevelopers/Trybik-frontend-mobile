import { StyleSheet } from 'react-native';
import { Theme } from '../../../../styles/globalTheme/theme';
import { buildCalculatorColors } from './colors';

export const createCalculatorStyles = (theme: Theme) => {
  const colors = buildCalculatorColors(theme);
  return StyleSheet.create({
    // Used by CalculatorScreen root
    container: {
      display: 'flex',
      height: '100%',
      backgroundColor: colors.backgroundPrimary,
    },
    // Used by CalculatorScreen when list is empty
    noItemsInfo: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    // Used by CalculatorScreen empty state text
    noItemsInfoText: {
      fontSize: 18,
      fontStyle: 'italic',
      color: colors.textSecondary,
    },
  });
};

export default createCalculatorStyles;
export type CalculatorStyles = ReturnType<typeof createCalculatorStyles>;
