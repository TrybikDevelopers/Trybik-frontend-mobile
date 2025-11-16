import { StyleSheet } from 'react-native';
import type { Theme } from '../../../../../styles/globalTheme/theme';

export const createGroupCardStyles = (theme: Theme) => {
  const { colors } = theme;

  return StyleSheet.create({
    card: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      height: '100%',
      paddingHorizontal: 15,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: '#2e2e2e',

      zIndex: 1000,
    },
    label: {
      flex: 1,
      color: colors.textPrimary,
      fontSize: 15,
      fontWeight: '500',
      height: '100%',
      textAlign: 'center',
    },
    leftSection: {
      display: 'flex',
      width: '60%',
      justifyContent: 'space-around',
      alignItems: 'center',
      flexDirection: 'row',
    },
    icon: {
      justifyContent: 'center',
      alignItems: 'center',
      height: 40,
      padding: 10,
      borderRadius: 10,
    },
    dropdownContainer: {
      height: 40,
      width: '35%',
    },
    GG: { backgroundColor: '#059669' }, // green
    L: { backgroundColor: '#dc2626' }, // red
    K: { backgroundColor: '#ea580c' }, // orange
    P: { backgroundColor: '#4b5563' }, // gray
  });
};