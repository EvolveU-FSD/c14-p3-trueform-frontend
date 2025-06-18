import { StyleSheet } from 'react-native';
import { Theme } from '../theme/ThemeContext';
import { spacing, fontSizes, borderRadius, buttonHeights } from '../utils/sizes';

export function createStyles(theme: Theme) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.backgroundColor,
    },
    scrollContainer: {
      flexGrow: 1,
      padding: spacing.lg,
      justifyContent: 'center',
    },
    title: {
      fontSize: fontSizes.xl,
      fontWeight: 'bold',
      marginBottom: spacing.xl,
      textAlign: 'center',
      color: theme.textColor,
    },
    input: {
      height: buttonHeights.lg,
      borderWidth: 1,
      borderColor: theme.borderColor,
      borderRadius: borderRadius.md,
      marginBottom: spacing.md,
      paddingHorizontal: spacing.md,
      fontSize: fontSizes.md,
      backgroundColor: theme.isDarkMode ? '#232323' : '#f9f9f9',
      color: theme.textColor,
    },
    button: {
      backgroundColor: theme.primaryColor,
      height: buttonHeights.xl,
      borderRadius: borderRadius.md,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: spacing.lg,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    disabledButton: {
      backgroundColor: theme.secondaryColor,
    },
    buttonText: {
      color: theme.textColor === '#FFFFFF' ? '#121212' : 'white',
      fontSize: fontSizes.lg,
      fontWeight: 'bold',
    },
    linkContainer: {
      marginTop: spacing.xl,
      alignItems: 'center',
    },
    link: {
      color: theme.primaryColor,
      fontSize: fontSizes.md,
    },
  });
}
