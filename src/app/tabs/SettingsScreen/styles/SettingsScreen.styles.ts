import { StyleSheet } from 'react-native';
import { Theme } from '../../../../styles/globalTheme/theme';
import { textSize } from '../../../../utils/textHierarchy';

export const createSettingsStyle = (theme: Theme) => {
  const colors = {
    mainBg: theme.colors.Background,
    text: theme.colors.textPrimary,
    settingsBg: theme.colors.settingsBackground,
  };

  return StyleSheet.create({
    bgContainer: {
      flex: 1,
      backgroundColor: colors.mainBg,
    },
    container: {
      paddingVertical: 40,
      paddingHorizontal: 15,
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: colors.settingsBg,
    },
    titleText: {
      alignSelf: 'center',
      color: colors.text,
      fontSize: textSize.H2,
      fontWeight: 'bold',
    },
    labelText: {
      marginBottom: 20,
      alignSelf: 'center',
      color: colors.text,
      fontSize: textSize.H2,
      fontWeight: 'bold',
    },
    notifications: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: 40,
      flexWrap: 'wrap',
    },
    notificationsMid: {
      flexDirection: 'column',
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 12,
      flexWrap: 'wrap',
    },
    scrollContent: {
      paddingBottom: 20,
      flexGrow: 1,
    },
    cardsContainer: {
      justifyContent: 'flex-start',
      alignItems: 'center',
      width: '100%',
      flex: 1,
      gap: 16, 
    },
    togglesContainer: {
      marginTop: 30,
      width: '100%',
      justifyContent: 'center',
      height: 'auto',
      gap: 10,
    },
    appearanceContainer: {
      width: '100%',
      marginTop: 30,
      height: 'auto',
      justifyContent: 'center',
      gap: 10,
    },
    authenticationContainer: {
      width: '90%',
      marginTop: 30,
    },
  });
};

export default createSettingsStyle;
