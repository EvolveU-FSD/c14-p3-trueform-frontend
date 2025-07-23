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
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.xl,
    },
    iconContainer: {
      marginBottom: spacing.xl,
    },
    title: {
      fontSize: fontSizes.xxl,
      fontWeight: 'bold',
      color: theme.textColor,
      marginBottom: spacing.sm,
      textAlign: 'center',
    },
    subtitle: {
      fontSize: fontSizes.lg,
      fontWeight: '600',
      color: '#4CAF50',
      marginBottom: spacing.lg,
      textAlign: 'center',
    },
    description: {
      fontSize: fontSizes.md,
      color: theme.secondaryColor,
      textAlign: 'center',
      lineHeight: 24,
      marginBottom: spacing.xl,
      maxWidth: 300,
    },
    shopButton: {
      backgroundColor: theme.primaryColor,
      paddingVertical: spacing.lg,
      paddingHorizontal: spacing.xl,
      borderRadius: borderRadius.md,
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: buttonHeights.lg,
      width: '100%',
      maxWidth: 280,
    },
    shopButtonText: {
      color: '#ffffff',
      fontSize: fontSizes.lg,
      fontWeight: '600',
    },
  });
}

export type Styles = ReturnType<typeof useCreateStyles>;
