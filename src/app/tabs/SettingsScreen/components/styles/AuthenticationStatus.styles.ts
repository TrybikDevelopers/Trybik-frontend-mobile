import { StyleSheet } from 'react-native';
import { textSize } from '../../../../../utils/textHierarchy';
import { Theme } from '../../../../../styles/globalTheme/theme';
// Styles extracted from RepresentativeStatus component to keep JSX clean.
// Button/colors could later be themed via a central design system.
export const createSwitchStyles = (theme: Theme) => StyleSheet.create({
  statusText: {
    //TODO add spacing, use flex, width and height (not with margins, because it not responsive) @Kacper
  },
  button: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    backgroundColor:  theme.colors.confirmAccent,
    borderRadius: 6,
  },
  buttonText: {
    fontSize: textSize.H3,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

