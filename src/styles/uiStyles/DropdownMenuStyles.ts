import { StyleSheet } from 'react-native';
import { Theme } from '../globalTheme/theme';

export const createDropdownMenuStyles = (theme: Theme) => {

  const colors = {
    dropdownBackgroundColor: theme.colors.confirmAccent2,
    dropdownTextColor: theme.colors.textPrimary,
  };

  return StyleSheet.create({
    buttonSizes: { width: '100%', height: '100%' },
    list: {
      zIndex: 100,
      width: '100%',
      height: '400%',
      position: 'absolute',
    },
    container: {
      margin: 32,
      alignItems: 'center',
    },
    button: {
      padding: 12,
      backgroundColor: colors.dropdownBackgroundColor,
      borderRadius: 8,
      width: 200,
    },
    buttonText: {
      color: '#fff',
      textAlign: 'center',
    },
    overlay: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: 'rgba(0,0,0,0.4)',
      alignItems: 'center',
    },
    modal: {
      // backgroundColor: '#222',
      backgroundColor: colors.dropdownBackgroundColor,
      borderRadius: 8,
      paddingVertical: 8,
      width: 200,
    },
    option: {
      padding: 12,
    },
    optionText: {
      color: '#fff',
      textAlign: 'center',
    },
    groupSelectText: {
      // color: 'white',
      color: colors.dropdownTextColor,
      fontSize: 12,
    },
    placeholderText: {
      fontSize: 12,
      // color: '#9c9c9c',
      color: colors.dropdownTextColor+'A0',
    },
  });
};

export default createDropdownMenuStyles;
