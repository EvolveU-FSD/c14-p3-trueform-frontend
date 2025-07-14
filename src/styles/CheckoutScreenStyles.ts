import { StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { spacing, fontSizes, borderRadius } from '../utils/sizes';

export default function useCreateStyles() {
  const { theme } = useTheme();

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.backgroundColor,
    },
    content: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.xl,
    },
    title: {
      fontSize: fontSizes.xxl,
      fontWeight: 'bold',
      color: theme.textColor,
      marginBottom: spacing.md,
      textAlign: 'center',
    },
    subtitle: {
      fontSize: fontSizes.xl,
      fontWeight: '600',
      color: theme.primaryColor,
      marginBottom: spacing.lg,
      textAlign: 'center',
    },
    description: {
      fontSize: fontSizes.md,
      color: theme.secondaryColor,
      textAlign: 'center',
      lineHeight: 24,
      marginBottom: spacing.xl,
    },
    buttonContainer: {
      width: '100%',
      gap: spacing.md,
    },
    backButton: {
      backgroundColor: theme.borderColor,
      paddingVertical: spacing.lg,
      borderRadius: borderRadius.md,
      alignItems: 'center',
      justifyContent: 'center',
    },
    backButtonText: {
      color: theme.textColor,
      fontSize: fontSizes.lg,
      fontWeight: '600',
    },
    paymentButton: {
      backgroundColor: theme.primaryColor,
      paddingVertical: spacing.lg,
      borderRadius: borderRadius.md,
      alignItems: 'center',
      justifyContent: 'center',
    },
    paymentButtonText: {
      color: '#ffffff',
      fontSize: fontSizes.lg,
      fontWeight: '600',
    },
  });
}

export type Styles = ReturnType<typeof useCreateStyles>;
