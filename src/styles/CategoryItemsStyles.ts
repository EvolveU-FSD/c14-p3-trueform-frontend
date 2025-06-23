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
    gridContainer: {
      padding: spacing.md,
    },
    columnWrapper: {
      justifyContent: 'space-between',
      marginBottom: spacing.md,
    },
    itemCard: {
      width: buttonHeights.lg, // Use predefined sizes for item width
      backgroundColor: theme.backgroundColor,
      borderRadius: borderRadius.md,
      overflow: 'hidden',
      shadowColor: theme.textColor,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    imageContainer: {
      width: '100%',
      aspectRatio: 1,
    },
    itemImage: {
      width: '100%',
      height: '100%',
    },
    itemContent: {
      padding: spacing.sm,
    },
    itemName: {
      fontSize: fontSizes.md,
      fontWeight: '600',
      color: theme.textColor,
      marginBottom: spacing.xs,
    },
    itemPrice: {
      fontSize: fontSizes.lg,
      fontWeight: '700',
      color: theme.primaryColor,
    },
    emptyText: {
      textAlign: 'center',
      fontSize: fontSizes.md,
      color: theme.secondaryColor,
      marginTop: spacing.md,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
      backgroundColor: theme.backgroundColor,
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
      marginRight: spacing.xs,
      color: theme.textColor,
    },
    plusIcon: {
      fontSize: fontSizes.lg,
      color: theme.textColor,
    },
    sortOptionsContainer: {
      backgroundColor: theme.backgroundColor,
      borderBottomWidth: 1,
      borderBottomColor: theme.borderColor,
      padding: spacing.sm,
    },
    sortOption: {
      padding: spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: theme.borderColor,
    },
    sortOptionActive: {
      backgroundColor: theme.secondaryColor,
    },
    sortOptionText: {
      fontSize: fontSizes.sm,
      color: theme.textColor,
    },
    content: {
      flex: 1,
      marginBottom: spacing.xxl, // Space for bottom nav
    },
    bottomNav: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
      backgroundColor: theme.backgroundColor,
      borderTopWidth: 1,
      borderTopColor: theme.borderColor,
    },
    navButton: {
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.md,
      backgroundColor: theme.primaryColor,
      borderRadius: borderRadius.md,
    },
    navButtonText: {
      color: theme.textColor,
      fontSize: fontSizes.md,
      fontWeight: '500',
    },
  });
}
