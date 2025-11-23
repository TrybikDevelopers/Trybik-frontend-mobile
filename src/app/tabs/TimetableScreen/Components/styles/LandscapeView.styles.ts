import { StyleSheet, Dimensions  } from 'react-native'; 
import { Theme } from '../../../../../styles/globalTheme/theme';

export const createLandscapeViewStyles = (theme: Theme) => {
  const { width, height } = Dimensions.get('window'); 
  const toPrecentMultiplier = 0.001; 
  const HeaderFontSize = width * (20 * toPrecentMultiplier); 

  return StyleSheet.create({
    mainRow: {
      flexDirection: 'row',
      marginTop: height * (35 * toPrecentMultiplier), 
      marginLeft: width * (10 * toPrecentMultiplier), 
      alignItems: 'flex-start',
    },

    weekIndicator: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: height * (10 * toPrecentMultiplier), 
    },

    weekTypeText: {
      fontSize: HeaderFontSize, 
      fontWeight: '600',
      color: theme.colors.themeOpposite,
      marginLeft: width * (15 * toPrecentMultiplier),  
      
    },

    dayTitleLandscape: {
      fontSize: HeaderFontSize, 
      fontWeight: '700',
      color: theme.colors.dayTitle,
      textAlign: 'center',
      marginBottom: height * (10 * toPrecentMultiplier), 
    },

    hoursColumn: {
      marginRight: width * (10 * toPrecentMultiplier), 
      marginTop: height * (10 * toPrecentMultiplier), 
      alignItems: 'center',
    },

    dayColumn: {
      flex: 1,
      marginRight: width * (10 * toPrecentMultiplier), 
      marginTop: height * (10 * toPrecentMultiplier), 
      alignItems: 'center',
    },

    hourBlock: {
      width: '100%',
      alignItems: 'stretch',
      gap: height * (8 * toPrecentMultiplier), 
      marginBottom: height * (10 * toPrecentMultiplier), 
    },

    lessonBlock: {
      gap: height * (8 * toPrecentMultiplier), 
      marginBottom: height * (10 * toPrecentMultiplier), 
      width: '100%',
      alignItems: 'stretch',
    },
  });
};
