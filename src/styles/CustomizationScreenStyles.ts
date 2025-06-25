import { StyleSheet } from 'react-native';
import { spacing, fontSizes, borderRadius } from '../utils/sizes';
import { useTheme } from '../theme/ThemeContext';

export default function useCreateStyles() {
  const { theme } = useTheme();

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.backgroundColor,
    },
    stepsContainer: {
      padding: spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: theme.borderColor,
    },
    stepItem: {
      alignItems: 'center',
      marginRight: spacing.md,
      opacity: 0.7,
    },
    stepNumber: {
      width: spacing.lg,
      height: spacing.lg,
      borderRadius: borderRadius.full,
      backgroundColor: theme.primaryColor,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: spacing.xs,
    },
    stepNumberText: {
      color: theme.textColor,
      fontSize: fontSizes.sm,
      fontWeight: '600',
    },
    stepTitle: {
      fontSize: fontSizes.xs,
      color: theme.primaryColor,
      fontWeight: '500',
    },
    content: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: spacing.lg,
    },
    startText: {
      fontSize: fontSizes.md,
      color: theme.secondaryColor,
      marginBottom: spacing.md,
      textAlign: 'center',
    },
    startButton: {
      backgroundColor: theme.primaryColor,
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.lg,
      borderRadius: borderRadius.md,
    },
    startButtonText: {
      color: theme.textColor,
      fontSize: fontSizes.md,
      fontWeight: '600',
    },
  });
}

export type Styles = ReturnType<typeof useCreateStyles>;
