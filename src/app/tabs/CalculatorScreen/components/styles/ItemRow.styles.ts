import { StyleSheet } from 'react-native';
import { Theme } from '../../../../../styles/globalTheme/theme';

export const createItemRowStyles = (theme: Theme) => {
  const colors = {
    backgroundItem: theme.colors.border,
    backgroundPrimary: theme.colors.Foreground,
    borderLight: theme.colors.themeOpposite,
    textPrimary: theme.colors.textPrimary,
    themeOpposite: theme.colors.themeOpposite,
  };
  return StyleSheet.create({
    rootItemContainer: {
      backgroundColor: colors.backgroundItem,
      paddingLeft: 10,
      borderRadius: theme.borderRads.m,
      minHeight: 40,
      height: 'auto',
      display: 'flex',
      flexDirection: 'row',
      gap: 5,
      marginTop: 5,
      alignSelf: 'center',
      alignItems: 'center',
    },
    ItemSelectBox: {
      backgroundColor: 'transparent',
      borderWidth: 0.75,
      borderColor: colors.borderLight,
      borderRadius: theme.borderRads.xs,
      width: 19,
      height: 19,
      textAlignVertical: 'center',
      alignContent: 'center',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    ItemSelectBoxSelected: {
      backgroundColor: colors.themeOpposite,
      borderWidth: 0.75,}
      ,
    deleteButtonText: {
      color: colors.backgroundPrimary,
      fontSize: 10,
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      lineHeight: 10,
    },
    itemContainer: {
      flexDirection: 'row',
      width: '90%',
      height: '100%',
      paddingHorizontal: 15,
    },
    bottomMenu: {
      fontSize: 16,
      color: colors.textPrimary,
    },
    singleItem: { width: '33.33%' },
    leftText: { textAlign: 'left', textAlignVertical: 'center' },
    centerText: { textAlign: 'center', textAlignVertical: 'center' },
    rightText: { textAlign: 'right', textAlignVertical: 'center' },
  });
};
