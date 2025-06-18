import { StyleSheet } from 'react-native';
import { spacing, fontSizes, borderRadius } from '../utils/sizes';
import { Theme } from '../theme/ThemeContext';

export function createStyles(theme: Theme) {
  return StyleSheet.create({
    title: {
      fontSize: fontSizes.md,
      fontWeight: '600',
      color: theme.textColor,
      padding: spacing.md,
      paddingBottom: spacing.sm,
    },
    gridContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      padding: spacing.md,
      gap: spacing.md,
    },
    gridItem: {
      width: '47%',
      height: spacing.lg,
      backgroundColor: theme.primaryColor,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: spacing.sm,
      borderRadius: borderRadius.md,
    },
    selectedItem: {
      backgroundColor: theme.secondaryColor,
    },
    itemText: {
      color: theme.textColorInverse,
      fontSize: fontSizes.md,
      fontWeight: '600',
      textAlign: 'center',
    },
  });
}
