import { StyleSheet } from 'react-native';
import { Theme } from '../../../../../styles/globalTheme/theme';

export const createSummaryPanelStyles = (theme: Theme) => {
  const colors = {
    borderGray: theme.colors.border,
    textSecondary: theme.colors.textSecondary,
    textPrimary: theme.colors.textPrimary,
  };
  return StyleSheet.create({
    summaryContainer: {
      marginTop: 5,
      borderWidth: 1,
      borderColor: colors.borderGray,
      width: '95%',
      height: 70,
      paddingVertical: 7,
      borderRadius: theme.borderRads.m,
      alignSelf: 'center',
      display: 'flex',
      justifyContent: 'space-around',
      flexDirection: 'column',
      marginBottom: 15,
    },
    summarySpacer: { display: 'flex', flexDirection: 'row' },
    countersText: {
      fontSize: 16,
      color: colors.textSecondary,
    },
    singleItem: { width: '33.33%' },
    centerText: { textAlign: 'center', textAlignVertical: 'center' },
    bottomMenu: {
      fontSize: 16,
      color: colors.textPrimary,
    },
  });
};
