import { StyleSheet } from 'react-native';
import { Theme } from '../../../../../styles/globalTheme/theme';

export const createSubjectsListStyles = (_theme: Theme) =>
  StyleSheet.create({
    subjectsListContainer: {
      flex: 1,
      width: '100%',
    },
  });
