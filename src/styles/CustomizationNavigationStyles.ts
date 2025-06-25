import { StyleSheet } from 'react-native';
import { spacing, fontSizes, borderRadius } from '../utils/sizes';
import { useTheme } from '../theme/ThemeContext';

export default function useCreateStyles() {
  const { theme } = useTheme();

  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: spacing.md,
      borderTopWidth: 1,
      borderTopColor: theme.borderColor,
      backgroundColor: theme.backgroundColor,
    },
    button: {
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.lg,
      borderRadius: borderRadius.md,
      borderWidth: 1,
      borderColor: theme.borderColor,
    },
    primaryButton: {
      backgroundColor: theme.primaryColor,
      borderColor: theme.primaryColor,
    },
    buttonText: {
      fontSize: fontSizes.md,
      color: theme.textColor,
    },
    primaryButtonText: {
      color: theme.textColor,
    },
  });
}

export type Styles = ReturnType<typeof useCreateStyles>;
