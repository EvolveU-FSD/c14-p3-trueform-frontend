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
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    errorContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: spacing.lg,
    },
    errorText: {
      fontSize: fontSizes.md,
      color: 'red',
      textAlign: 'center',
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
    activeStepItem: {
      opacity: 1,
    },
    stepNumber: {
      width: spacing.lg,
      height: spacing.lg,
      borderRadius: borderRadius.full,
      backgroundColor: theme.secondaryColor,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: spacing.xs,
    },
    activeStepNumber: {
      backgroundColor: theme.primaryColor,
    },
    stepNumberText: {
      color: theme.textColor,
      fontSize: fontSizes.sm,
      fontWeight: '600',
    },
    stepTitle: {
      fontSize: fontSizes.xs,
      color: theme.secondaryColor,
      fontWeight: '500',
    },
    activeStepTitle: {
      color: theme.primaryColor,
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
    optionsContainer: {
      flex: 1,
      padding: spacing.md,
    },
    optionsTitle: {
      fontSize: fontSizes.lg,
      fontWeight: '600',
      color: theme.textColor,
      marginBottom: spacing.md,
    },
    line: {
      height: 1,
      backgroundColor: '#ddd',
      marginVertical: 8,
    },
  });
}

export type Styles = ReturnType<typeof useCreateStyles>;
