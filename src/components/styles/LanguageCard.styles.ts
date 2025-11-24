import { StyleSheet } from "react-native";
import { Theme } from "../../styles/globalTheme/theme";

export const createLanguageCardStyles = (theme: Theme) => {
  const { colors } = theme;

  return StyleSheet.create({
    card: {
      width: "100%",
      height: 80,
      borderRadius: 12,
      
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.Foreground,

      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 30,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    leftSection: {
      width: '60%',
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    label: {
      width: '100%',
      color: colors.textPrimary,
      fontSize: 16,
      fontWeight: '500',
      textAlign: 'left',
    },
    dropdownContainer: {
      alignItems: 'center',
      marginLeft: 'auto',
      width: '40%',
    },
  });
};