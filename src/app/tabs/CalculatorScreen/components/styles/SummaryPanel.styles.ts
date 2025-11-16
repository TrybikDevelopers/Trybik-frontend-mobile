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
      paddingLeft: 15,
      paddingRight: 15,
      borderWidth: 1,
      borderColor: colors.borderGray,
      width: '95%',
      paddingVertical: 7,
      borderRadius: theme.borderRads.m,
      alignSelf: 'center',
      display: 'flex',
      flexDirection: 'column',
      marginBottom: 20,
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
