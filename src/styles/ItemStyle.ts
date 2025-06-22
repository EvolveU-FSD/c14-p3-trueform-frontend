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
    centerContent: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    errorText: {
      fontSize: fontSizes.lg,
      color: 'red',
      textAlign: 'center',
      marginHorizontal: spacing.md,
    },
    itemCount: {
      fontSize: fontSizes.md,
      color: theme.secondaryColor,
      padding: spacing.md,
    },
    gridContainer: {
      paddingHorizontal: spacing.sm,
      paddingBottom: spacing.lg,
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
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    itemImage: {
      width: '100%',
      aspectRatio: 1,
      backgroundColor: theme.borderColor, // Placeholder color while loading
    },
    itemContent: {
      padding: spacing.sm,
    },
    itemName: {
      fontSize: fontSizes.md,
      fontWeight: '500',
      color: theme.textColor,
      marginBottom: spacing.xs,
    },
    itemPrice: {
      fontSize: fontSizes.md,
      fontWeight: 'bold',
      color: theme.primaryColor,
    },
    filterDropdown: {
      position: 'absolute',
      top: 60,
      right: spacing.md,
      backgroundColor: theme.backgroundColor,
      borderRadius: borderRadius.md,
      padding: spacing.md,
      elevation: 5,
      shadowColor: theme.textColor,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      zIndex: 1000,
      minWidth: 200,
      borderWidth: 1,
      borderColor: theme.borderColor,
    },
    sortDropdown: {
      position: 'absolute',
      top: 60,
      left: spacing.md,
      backgroundColor: theme.backgroundColor,
      borderRadius: borderRadius.md,
      elevation: 5,
      shadowColor: theme.textColor,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      zIndex: 1000,
      minWidth: 150,
      borderWidth: 1,
      borderColor: theme.borderColor,
    },
    filterSection: {
      marginBottom: spacing.md,
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
      marginTop: spacing.sm,
    },
    filterOption: {
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.md,
      marginBottom: spacing.xs,
      borderRadius: borderRadius.sm,
      backgroundColor: theme.borderColor,
    },
    filterOptionSelected: {
      backgroundColor: theme.primaryColor,
    },
    filterOptionText: {
      fontSize: fontSizes.sm,
      color: theme.textColor,
    },
    filterOptionTextSelected: {
      color: theme.textColorInverse,
    },
  });
}
