import { StyleSheet } from 'react-native';
import { spacing, fontSizes, borderRadius } from '../utils/sizes';
import { useTheme } from '../theme/ThemeContext';

export default function createStyles() {
  const { theme } = useTheme();

  return StyleSheet.create({
    container: {
      paddingVertical: spacing.sm,
      borderBottomWidth: 1,
      borderBottomColor: theme.borderColor,
      backgroundColor: theme.backgroundColor,
    },
    contentContainer: {
      paddingHorizontal: spacing.md,
      alignItems: 'center',
    },
    stepItem: {
      alignItems: 'center',
      marginRight: spacing.md,
      opacity: 0.7,
    },
    activeStep: {
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
  });
}
