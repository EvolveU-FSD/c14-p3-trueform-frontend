import { StyleSheet } from 'react-native';
import { spacing, fontSizes, borderRadius } from '../utils/sizes';
import { Theme } from '../theme/ThemeContext';

export function createStyles(theme: Theme) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.backgroundColor,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
      borderBottomWidth: 1,
      borderBottomColor: theme.borderColor,
    },
    headerButton: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: spacing.sm,
    },
    headerButtonText: {
      fontSize: fontSizes.md,
      color: theme.textColor,
    },
    backButton: {
      padding: spacing.sm,
    },
    gridContainer: {
      padding: spacing.sm,
    },
    columnWrapper: {
      justifyContent: 'space-between',
      paddingHorizontal: spacing.sm,
    },
    itemCard: {
      width: '48%',
      marginBottom: spacing.md,
      backgroundColor: theme.backgroundColor,
      borderRadius: borderRadius.md,
      overflow: 'hidden',
      elevation: 2,
      shadowColor: theme.textColor,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
    },
    itemImage: {
      width: '100%',
      aspectRatio: 1,
    },
    itemContent: {
      padding: spacing.sm,
    },
    itemName: {
      fontSize: fontSizes.sm,
      fontWeight: '500',
      marginBottom: spacing.xs,
      color: theme.textColor,
    },
    itemPrice: {
      fontSize: fontSizes.md,
      fontWeight: 'bold',
      color: theme.primaryColor,
    },
    sortDropdown: {
      position: 'absolute',
      top: spacing.xxl,
      left: spacing.md,
      backgroundColor: theme.backgroundColor,
      borderRadius: borderRadius.md,
      elevation: 5,
      shadowColor: theme.textColor,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      zIndex: 1000,
    },
    sortOption: {
      padding: spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: theme.borderColor,
    },
    sortOptionSelected: {
      backgroundColor: theme.secondaryColor,
    },
    sortOptionText: {
      fontSize: fontSizes.sm,
      color: theme.textColor,
    },
    filterDropdown: {
      position: 'absolute',
      top: spacing.xxl,
      right: spacing.md,
      backgroundColor: theme.backgroundColor,
      borderRadius: borderRadius.md,
      shadowColor: theme.textColor,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 5,
      zIndex: 1000,
      minWidth: 200,
      padding: spacing.md,
    },
    filterHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: spacing.sm,
    },
    filterTitle: {
      fontSize: fontSizes.md,
      fontWeight: '600',
      color: theme.textColor,
    },
    filterOptions: {
      flexDirection: 'column',
    },
    filterOption: {
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: theme.borderColor,
    },
    filterOptionSelected: {
      backgroundColor: theme.secondaryColor,
    },
    filterOptionText: {
      fontSize: fontSizes.sm,
      color: theme.textColor,
    },
  });
}
