import { StyleSheet } from 'react-native';
import type { Theme } from '../../styles/globalTheme/theme';
import { textSize } from '../../utils/textHierarchy';

export const createSetupStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      justifyContent: 'flex-start',
      flexDirection: 'column',
      width: '100%',
      height: '100%',
      paddingTop: 100,
      backgroundColor: theme.colors.Foreground,
      gap: 30,
    },
    labelsContainer: {
      gap: 10,
    },
    title: {
      fontSize: textSize.H1,
      fontFamily: 'InterMedium',
      alignSelf: 'center',
      color: theme.colors.textPrimary,
      width: '90%',
      textAlign: 'center',
    },
    subtitle: {
      fontSize: 18,
      fontFamily: 'InterLight',
      alignSelf: 'center',
      color: theme.colors.textSecondary,
      textAlign: 'center',
      width: '90%',
    },
    errorText: {
      fontSize: textSize.H4,
      fontFamily: 'InterLight',
      alignSelf: 'center',
      color: theme.colors.error,
      textAlign: 'center',
    },
    dropdownContainer: {
      display: 'flex',
      width: '100%',
      height: 'auto',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    selectWrapper: {
      width: '50%',
      height: 90,
      alignSelf: 'center',
    },
    confirmButton: {
      backgroundColor: theme.colors.confirmAccent,
      paddingVertical: 12,
      borderRadius: theme.borderRads.m,
      alignSelf: 'center',
      width: '60%',

    },
    confirmButtonText: {
      color: '#fff',
      fontWeight: 'bold',
      textAlign: 'center',
    },
  });
