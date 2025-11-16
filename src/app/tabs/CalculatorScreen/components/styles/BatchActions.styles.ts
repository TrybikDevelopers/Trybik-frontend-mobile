import { StyleSheet } from 'react-native';
import { Theme } from '../../../../../styles/globalTheme/theme';

export const createBatchActionsStyles = (theme: Theme) => {
  const colors = {
    accentBlue: theme.colors.confirmAccent,
    accentRed: theme.colors.cancelAccent,
  };
  return StyleSheet.create({
    addCourseMenuBtn: {
      width: 50,
      height: 50,
      borderRadius: 50,
      backgroundColor: colors.accentBlue,
      display: 'flex',
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 20,
    },
    addCourseMenuBtnText: {
      fontSize: 35,
      color: '#fff',
    },
    removeCourseMenuBtn: {
      width: 250,
      height: 45,
      marginTop: 5,
      borderRadius: 50,
      backgroundColor: colors.accentRed,
      display: 'flex',
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 20,
    },
    removeButtonContents: {
      display: 'flex',
      flexDirection: 'row',
      gap: 10,
    },
    removeCourseMenuBtnText: {
      fontSize: 20,
      color: '#fff',
    },
  });
};
