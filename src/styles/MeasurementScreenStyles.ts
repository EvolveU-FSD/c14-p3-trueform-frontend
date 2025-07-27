import { StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { spacing, fontSizes, borderRadius, buttonHeights } from '../utils/sizes';

export default function useCreateStyles() {
  const { theme } = useTheme();

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.backgroundColor,
    },
    content: {
      flex: 1,
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.xl,
      justifyContent: 'center',
    },
    headerSection: {
      alignItems: 'center',
      marginBottom: spacing.xxl,
    },
    title: {
      fontSize: fontSizes.xl,
      fontWeight: 'bold',
      color: theme.textColor,
      textAlign: 'center',
      marginBottom: spacing.md,
    },
    subtitle: {
      fontSize: fontSizes.md,
      color: theme.secondaryColor,
      textAlign: 'center',
      lineHeight: 22,
      maxWidth: 300,
    },
    buttonContainer: {
      width: '100%',
      gap: spacing.lg,
    },
    primaryButton: {
      backgroundColor: theme.primaryColor,
      height: buttonHeights.xxl,
      borderRadius: borderRadius.md,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.md,
    },
    primaryButtonText: {
      color: '#ffffff',
      fontSize: fontSizes.lg,
      fontWeight: 'bold',
      marginBottom: spacing.xs,
    },
    primaryButtonDescription: {
      fontSize: fontSizes.sm,
      color: 'rgba(255, 255, 255, 0.8)',
      textAlign: 'center',
    },
    secondaryButton: {
      backgroundColor: theme.backgroundColor,
      borderWidth: 2,
      borderColor: theme.primaryColor,
      height: buttonHeights.xxl,
      borderRadius: borderRadius.md,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.md,
    },
    secondaryButtonText: {
      color: theme.primaryColor,
      fontSize: fontSizes.lg,
      fontWeight: 'bold',
      marginBottom: spacing.xs,
    },
    secondaryButtonDescription: {
      fontSize: fontSizes.sm,
      color: theme.secondaryColor,
      textAlign: 'center',
    },
  });
}

export type Styles = ReturnType<typeof useCreateStyles>;
