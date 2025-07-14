import { StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { spacing, fontSizes, borderRadius } from '../utils/sizes';

export default function useCreateStyles() {
  const { theme } = useTheme();

  return StyleSheet.create({
    container: {
      backgroundColor: theme.backgroundColor,
      borderRadius: borderRadius.md,
      padding: spacing.lg,
      marginBottom: spacing.md,
      borderWidth: 1,
      borderColor: theme.borderColor,
      width: '100%',
    },
    welcomeContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: spacing.sm,
    },
    loginPromptContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: spacing.sm,
    },
    textContainer: {
      flex: 1,
      marginHorizontal: spacing.md,
    },
    welcomeText: {
      fontSize: fontSizes.lg,
      fontWeight: '600',
      color: theme.textColor,
      marginBottom: spacing.xs,
    },
    subtitleText: {
      fontSize: fontSizes.sm,
      color: theme.secondaryColor,
    },
    promptTitle: {
      fontSize: fontSizes.md,
      fontWeight: '600',
      color: theme.textColor,
      marginBottom: spacing.xs,
    },
    promptSubtitle: {
      fontSize: fontSizes.sm,
      color: theme.secondaryColor,
    },
    loginButton: {
      backgroundColor: theme.primaryColor,
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.md,
      borderRadius: borderRadius.md,
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.xs,
    },
    loginButtonText: {
      color: '#fff',
      fontSize: fontSizes.sm,
      fontWeight: '600',
    },
    guestContainer: {
      alignItems: 'center',
      marginTop: spacing.md,
      paddingTop: spacing.md,
      borderTopWidth: 1,
      borderTopColor: theme.borderColor,
    },
    guestText: {
      fontSize: fontSizes.sm,
      color: theme.secondaryColor,
      fontStyle: 'italic',
    },
  });
}
