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
      flexGrow: 0,
      flexShrink: 0,
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.md,
      backgroundColor: theme.backgroundColor,
      maxHeight: spacing.xxl * 2,
    },
    stepsContentContainer: {
      paddingRight: spacing.md, // Extra padding at the end for better scrolling
    },
    stepItem: {
      alignItems: 'center',
      marginRight: spacing.lg,
      opacity: 0.7,
      minWidth: spacing.xl,
    },
    activeStepItem: {
      opacity: 1,
    },
    circle: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: theme.secondaryColor,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: spacing.xs,
    },
    activeCircle: {
      backgroundColor: theme.primaryColor,
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
      color: theme.textColor,
      fontWeight: '500',
      textAlign: 'center',
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
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
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
    optionBox: {
      width: '48%',
      marginBottom: spacing.md,
      padding: spacing.sm,
      borderRadius: borderRadius.md,
      backgroundColor: theme.borderColor,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: theme.secondaryColor,
    },
    optionBoxSelected: {
      backgroundColor: theme.primaryColor + '20',
      borderColor: theme.primaryColor,
    },
    optionImage: {
      width: '100%',
      height: 120,
      resizeMode: 'contain',
      marginBottom: spacing.sm,
      borderRadius: borderRadius.sm,
    },
    optionText: {
      fontSize: fontSizes.sm,
      color: theme.textColor,
      textAlign: 'center',
      fontWeight: '500',
    },
    // Navigation styles
    navigationContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.md,
      borderTopWidth: 1,
      borderTopColor: theme.borderColor,
      backgroundColor: theme.backgroundColor,
    },
    navButton: {
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.lg,
      borderRadius: borderRadius.md,
      minWidth: 80,
    },
    previousButton: {
      backgroundColor: theme.secondaryColor,
    },
    nextButton: {
      backgroundColor: theme.primaryColor,
    },
    disabledButton: {
      backgroundColor: '#a0a0a0',
      opacity: 0.6,
    },
    navButtonText: {
      fontSize: fontSizes.md,
      fontWeight: '600',
      color: theme.textColor,
      textAlign: 'center',
    },
    nextButtonText: {
      fontSize: fontSizes.md,
      fontWeight: '600',
      color: '#fff',
      textAlign: 'center',
    },
    disabledButtonText: {
      opacity: 0.5,
    },
    stepIndicator: {
      fontSize: fontSizes.sm,
      color: theme.secondaryColor,
      fontWeight: '500',
    },
  });
}

export type Styles = ReturnType<typeof useCreateStyles>;
