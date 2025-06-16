import { StyleSheet } from 'react-native';
import { Theme } from '../theme/ThemeContext';
import { spacing, fontSizes, borderRadius } from '../utils/sizes';

export function createStyles(theme: Theme) {
  return StyleSheet.create({
    container: {
      marginVertical: spacing.sm,
      paddingHorizontal: spacing.md,
    },
    input: {
      backgroundColor: theme.borderColor,
      color: theme.textColor,
      borderRadius: borderRadius.md,
      padding: spacing.sm,
      fontSize: fontSizes.md,
      shadowColor: theme.isDarkMode ? 'transparent' : 'rgba(0, 0, 0, 0.1)',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
      elevation: theme.isDarkMode ? 0 : 2,
    },
  });
}
