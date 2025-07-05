import { StyleSheet } from 'react-native';
import { spacing, fontSizes, borderRadius, buttonHeights } from '../utils/sizes';
import { useTheme } from '../theme/ThemeContext';

export default function useCreateStyles() {
  const { theme } = useTheme();

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.backgroundColor,
    },
    centerContent: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    // Header styles
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
      borderBottomWidth: 1,
      borderBottomColor: theme.borderColor,
      minHeight: buttonHeights.xl,
    },
    headerButton: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: spacing.sm,
      minHeight: buttonHeights.md,
    },
    headerButtonText: {
      fontSize: fontSizes.md,
      color: theme.textColor,
    },
    // Grid styles
    gridContainer: {
      paddingHorizontal: spacing.sm,
      paddingBottom: spacing.xl,
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
      borderWidth: 1,
      borderColor: theme.borderColor,
    },
    itemImage: {
      width: '100%',
      height: 180,
      backgroundColor: theme.borderColor,
    },
    itemContent: {
      padding: spacing.sm,
      minHeight: spacing.xxxl,
      justifyContent: 'space-between',
    },
    itemName: {
      fontSize: fontSizes.sm,
      fontWeight: '600',
      color: theme.textColor,
      marginBottom: spacing.xs,
      lineHeight: fontSizes.sm * 1.2,
    },
    itemPrice: {
      fontSize: fontSizes.md,
      fontWeight: 'bold',
      color: theme.primaryColor,
    },
    // Sort and Filter dropdowns
    sortDropdown: {
      position: 'absolute',
      top: buttonHeights.xl + spacing.sm, // Use button height + spacing for consistent positioning
      left: 0,
      right: 0,
      backgroundColor: theme.backgroundColor,
      borderBottomWidth: 1,
      borderBottomColor: theme.borderColor,
      elevation: 5,
      shadowColor: theme.textColor,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      zIndex: 1000,
    },
    sortOption: {
      padding: spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: theme.borderColor,
      minHeight: buttonHeights.lg,
      justifyContent: 'center',
    },
    sortOptionSelected: {
      backgroundColor: theme.primaryColor + '20',
    },
    sortOptionText: {
      fontSize: fontSizes.md,
      color: theme.textColor,
    },
    filterDropdown: {
      position: 'absolute',
      top: buttonHeights.xl + spacing.sm, // Use button height + spacing for consistent positioning
      left: 0,
      right: 0,
      backgroundColor: theme.backgroundColor,
      borderBottomWidth: 1,
      borderBottomColor: theme.borderColor,
      padding: spacing.md,
      elevation: 5,
      shadowColor: theme.textColor,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      zIndex: 1000,
      maxHeight: spacing.xxxl * 5, // Use spacing multiplier instead of hardcoded value
    },
    filterHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: spacing.sm,
      minHeight: buttonHeights.md,
    },
    filterTitle: {
      fontSize: fontSizes.md,
      fontWeight: '600',
      color: theme.textColor,
    },
    filterOptions: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginTop: spacing.sm,
      gap: spacing.xs, // Use gap instead of margins for better spacing
    },
    filterOption: {
      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.xs,
      backgroundColor: theme.borderColor,
      borderRadius: borderRadius.sm,
      borderWidth: 1,
      borderColor: theme.borderColor,
      minHeight: buttonHeights.sm,
      justifyContent: 'center',
      alignItems: 'center',
    },
    filterOptionSelected: {
      backgroundColor: theme.primaryColor,
      borderColor: theme.primaryColor,
    },
    filterOptionText: {
      fontSize: fontSizes.sm,
      color: theme.textColor,
    },
    // Error and loading states
    errorText: {
      fontSize: fontSizes.lg,
      color: 'red',
      textAlign: 'center',
      marginHorizontal: spacing.md,
    },
    itemCount: {
      fontSize: fontSizes.sm,
      color: theme.secondaryColor,
      padding: spacing.md,
      textAlign: 'center',
    },
    // Navigation
    backButton: {
      padding: spacing.sm,
      minHeight: buttonHeights.md,
      minWidth: buttonHeights.md,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
}

export type Styles = ReturnType<typeof useCreateStyles>;
