import { StyleSheet } from 'react-native';
import { Theme } from '../theme/ThemeContext';
import { spacing, fontSizes } from '../utils/sizes';

export function createCategoryStyles(theme: Theme) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.backgroundColor,
    },
    headerContainer: {
      padding: spacing.md,
      marginTop: spacing.sm,
    },
    categoryTitle: {
      fontSize: fontSizes.xxl,
      fontWeight: 'bold',
      color: theme.textColor,
      marginBottom: spacing.sm,
    },
    subtitle: {
      fontSize: fontSizes.md,
      color: theme.secondaryColor,
    },
    placeholderContainer: {
      flex: 1,
      padding: spacing.lg,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: spacing.xl * 2,
    },
    placeholderText: {
      fontSize: fontSizes.lg,
      fontWeight: 'bold',
      color: theme.textColor,
      textAlign: 'center',
      marginBottom: spacing.md,
    },
    placeholderSubtext: {
      fontSize: fontSizes.md,
      color: theme.secondaryColor,
      textAlign: 'center',
    },
  });
}
