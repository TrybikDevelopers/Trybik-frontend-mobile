import { StyleSheet } from 'react-native';
import { Theme } from '../../../../../styles/globalTheme/theme';

export const createHeaderRowStyles = (theme: Theme) => {

  const colors = {
    backgroundHeader: theme.colors.calculatorBackgroundHeader,
    backgroundPrimary: theme.colors.Foreground,
    themeOpposite: theme.colors.themeOpposite,
    textPrimary: theme.colors.textPrimary,
  };
  return StyleSheet.create({
    headerRootItemContainer: {
      backgroundColor: colors.backgroundHeader,
      paddingLeft: 10,
      borderRadius: theme.borderRads.m,
      height: 40,
      display: 'flex',
      flexDirection: 'row',
      gap: 5,
      marginTop: 5,
      alignSelf: 'center',
      alignItems: 'center',
    },
    itemSelectAllBox: {
      backgroundColor: 'transparent',
      borderWidth: 0.75,
      borderColor: colors.themeOpposite,
      borderRadius: theme.borderRads.xs,
      width: 19,
      height: 19,
      textAlignVertical: 'center',
      alignContent: 'center',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    itemSelectAllBoxSelected: {
      backgroundColor: colors.themeOpposite,
    },
    deleteButtonText: {
      color: colors.backgroundPrimary,
      fontSize: 10,
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      lineHeight: 10,
    },
    headerContainer: {
      flexDirection: 'row',
      width: '90%',
      height: '100%',
      paddingHorizontal: 10,
    },
    bottomMenu: {
      fontSize: 16,
      color: colors.textPrimary,
    },
    singleItemHeader: {
      width: '33.33%',
    },
    leftText: { textAlign: 'left', textAlignVertical: 'center' },
    centerText: { textAlign: 'center', textAlignVertical: 'center' },
    rightText: { textAlign: 'right', textAlignVertical: 'center' },
  });
};
