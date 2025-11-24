import { StyleSheet } from 'react-native';

// Wrapper around each GroupCard to provide spacing and a hook for layout tweaks
export const styles = StyleSheet.create({
  cardWrapper: {
    width: '100%',
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardWrappersContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 10, 
  },
});

export default styles;
