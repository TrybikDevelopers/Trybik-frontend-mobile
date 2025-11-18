import { StyleSheet } from 'react-native';
import { Theme } from '../globalTheme/theme';

export const createDropdownMenuStyles = (theme: Theme) => {
  const colors = {
    dropdownBackgroundColor: theme.colors.confirmAccent2,
    dropdownTextColor: theme.colors.textPrimary,
  };

  return StyleSheet.create({
    list: {
      zIndex: 1200,
      width: '100%',
      flex: 1,
      position: 'absolute',
      top: 40,
      height: 250,
    },
    container: {
      alignItems: 'center',
    },
    buttonPressed: {
      opacity: 0.5,
    },
    button: {
      width: '100%',
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.dropdownBackgroundColor,
      borderRadius: 8,
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
      position: 'absolute',
      top: 0,
      left: 0,
      height: 40,
      backgroundColor: colors.dropdownBackgroundColor,
      borderRadius: 8,
      paddingVertical: 8,
    },
    errorBorder: {
      borderColor: 'red',
      borderWidth: 2,
    },
    option: {
      padding: 12,
    },
    optionText: {
      color: '#fff',
      textAlign: 'center',
    },
    flatList: {
      height: 400,
    },
    groupSelectText: {
      // color: 'white',
      textAlign: 'center',
      color: colors.dropdownTextColor,
      fontSize: 12,
    },
    placeholderText: {
      fontSize: 12,
      // color: '#9c9c9c',
      color: colors.dropdownTextColor + 'A0',
    },
  });
};

export default createDropdownMenuStyles;
