import { StyleSheet } from 'react-native';
import { Theme } from '../../../../../styles/globalTheme/theme';

export const createBatchActionsStyles = (theme: Theme) => {
  const colors = {
    magenta: theme.colors.confirmAccent,
    red: theme.colors.cancelAccent,
  };
  return StyleSheet.create({
    addCourseMenuBtn: {
      position: 'absolute',
      width: 50,
      aspectRatio: 1,
      borderRadius: 50,
      backgroundColor: colors.magenta,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      bottom: 20,
      right: 30,
    },
    addCourseMenuBtnText: {
      fontSize: 45,
      color: '#fff',
    },
    removeCourseMenuBtn: {
      position: 'absolute',
      bottom: 20,
      width: '30%',
      height: 45,
      borderRadius: 50,
      backgroundColor: colors.red,
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
