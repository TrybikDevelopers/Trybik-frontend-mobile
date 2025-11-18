import { StyleSheet } from 'react-native';
import { Theme } from '../../../../../styles/globalTheme/theme';

export const createPopupFormStyles = (theme: Theme) => {
  const colors = {
    overlay: 'rgba(0, 0, 0, 0.5)',
    borderDefault: theme.colors.border,
    backgroundPopup: theme.colors.Foreground,
    textPrimary: theme.colors.textPrimary,
    textError: theme.colors.error,
    textSecondary: theme.colors.textSecondary,
    borderError: theme.colors.error,
    backgroundSecondary: theme.colors.userInput,
    borderGray: theme.colors.border,
    accentRedTransparent: theme.colors.cancelAccent + 'ea',
    cancelButtonBorder: theme.colors.border,
    confirmButtonBg: theme.colors.confirmAccent2,
    cancelButtonBg: theme.colors.cancelAccent2,
  };

  const baseInput = {
    backgroundColor: colors.backgroundSecondary,
    color: colors.textPrimary,
    borderRadius: theme.borderRads.m,
    borderWidth: 1,
    borderColor: colors.borderDefault,
  };

  return StyleSheet.create({
    overlayContainer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      height: '100%',
      width: '100%',

      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.overlay,
      zIndex: 2,
    },
    popUpMenu: {
      borderWidth: 2,
      borderColor: colors.borderDefault,
      backgroundColor: colors.backgroundPopup,

      justifyContent: 'space-around',
      alignItems: 'center',
      width: '80%',
      height: '70%',
      borderRadius: theme.borderRads.m,
      padding: 10,
    },
    overlayLabel: {
      fontSize: 15,
      textAlign: 'left',
      fontWeight: '600',
      color: colors.textPrimary,
    },
    overlayLabelErr: {
      color: colors.textError,
    },
    subjectSelectError: {
      borderColor: colors.borderError,
    },

    inputGroup: {
      width: '90%',
      gap: 8,
      flexDirection: 'row',
    },

    inputField: {
      width: '50%',
      gap: 6,
    },

    subjectSelect: {
      width: '90%',
      borderRadius: 8,

      display: 'flex',
      gap: 6,
      justifyContent: 'center',
    },

    subjectSelectDropdown: {
      height: 40,
      width: '100%',
    },

    inputErrorFeed: {
      color: colors.borderError,
    },

    userInput: {
      ...baseInput,
      paddingLeft: 10,
    },

    userInputFocused: {
      ...baseInput,
      outlineColor: colors.borderGray,
      outlineWidth: 3,
    },
    userInputFocusedError: {
      ...baseInput,
      outlineColor: colors.accentRedTransparent,
      outlineWidth: 3,
    },
    invalidUserInput: {
      ...baseInput,
      borderColor: colors.borderError,
      borderWidth: 2,
    },
    button: {
      width: '45%',
      height: 50,
      borderRadius: theme.borderRads.m,
      justifyContent: 'center',
      alignItems: 'center',
    },
    confirmButton: {
      backgroundColor: colors.confirmButtonBg,
    },
    cancelButton: {
      backgroundColor: colors.cancelButtonBg,
      borderWidth: 1,
      borderColor: colors.cancelButtonBorder,
    },
    buttonRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '90%',
      alignSelf: 'center',
    },
    buttonText: {
      color: colors.textPrimary,
      fontWeight: '600',
    },
  });
};
