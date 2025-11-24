import { StyleSheet } from "react-native";
import { Theme } from "../../../styles/globalTheme/theme";

export const createSwitchStyles = (theme: Theme) => {
  const { colors } = theme;

  return StyleSheet.create({
    contentContainer: {
      width: '100%',
      height: 80,

      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.border,

      backgroundColor: colors.Foreground,

      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingHorizontal: 30,
    },
    containerStyle: {
      width: 60,
      height: 30,
      borderRadius: 25,
      padding: 4,
    },
    circleStyle: {
      width: 40 / 2,
      height: 40 / 2,
      borderRadius: 20 / 2,
    },
    label: {
      width: '60%',
      textAlign: 'left',
      color: colors.textPrimary,
      fontSize: 16,
      fontWeight: '500',
    },
    switchContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      width: '40%',
    },
  });
};