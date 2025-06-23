import { StyleSheet } from 'react-native';
import { spacing, fontSizes, borderRadius, buttonHeights } from '../utils/sizes';
import { useTheme } from '../theme/ThemeContext';

export default function useCreateStyles() {
  const { theme } = useTheme();

  return StyleSheet.create({
    container: {
      flex: 1,
      padding: spacing.lg,
      justifyContent: 'center',
      backgroundColor: theme.backgroundColor,
    },
    title: {
      fontSize: fontSizes.xl,
      fontWeight: 'bold',
      marginBottom: spacing.lg,
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
      color: theme.textColor,
      backgroundColor: theme.isDarkMode ? '#232323' : '#fff',
    },
    button: {
      backgroundColor: theme.primaryColor,
      height: buttonHeights.lg,
      borderRadius: borderRadius.md,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: spacing.sm,
    },
    buttonText: {
      color: theme.textColor === '#FFFFFF' ? '#121212' : 'white',
      fontSize: fontSizes.md,
      fontWeight: 'bold',
    },
    linkContainer: {
      marginTop: spacing.lg,
      alignItems: 'center',
    },
    link: {
      color: theme.primaryColor,
      fontSize: fontSizes.md,
    },
  });
}
