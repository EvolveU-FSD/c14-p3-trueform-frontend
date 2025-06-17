import { StyleSheet } from 'react-native';
import { spacing } from '../utils/sizes';
import { Theme } from '../theme/ThemeContext';

export function createStyles(theme: Theme) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.backgroundColor,
    },
    scrollContainer: {
      flex: 1,
      paddingBottom: spacing.md,
    },
  });
}
