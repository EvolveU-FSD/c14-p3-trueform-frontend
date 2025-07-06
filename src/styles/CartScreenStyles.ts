import { StyleSheet } from 'react-native';
import { spacing, fontSizes, borderRadius } from '../utils/sizes';
import { useTheme } from '../theme/ThemeContext';

export default function useCreateStyles() {
  const { theme } = useTheme();

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.backgroundColor,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: spacing.lg,
    },
    emptyTitle: {
      fontSize: fontSizes.xl,
      fontWeight: 'bold',
      color: theme.textColor,
      marginBottom: spacing.sm,
    },
    emptySubtitle: {
      fontSize: fontSizes.md,
      color: theme.secondaryColor,
      textAlign: 'center',
    },
    listContainer: {
      padding: spacing.md,
    },
    cartItem: {
      flexDirection: 'row',
      backgroundColor: theme.backgroundColor,
      borderRadius: borderRadius.md,
      padding: spacing.md,
      marginBottom: spacing.md,
      shadowColor: theme.textColor,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
      borderWidth: 1,
      borderColor: theme.borderColor,
    },
    itemImage: {
      width: 80,
      height: 80,
      borderRadius: borderRadius.sm,
      marginRight: spacing.md,
    },
    itemDetails: {
      flex: 1,
    },
    itemName: {
      fontSize: fontSizes.md,
      fontWeight: 'bold',
      color: theme.textColor,
      marginBottom: spacing.xs,
    },
    itemPrice: {
      fontSize: fontSizes.sm,
      color: theme.secondaryColor,
      marginBottom: spacing.sm,
    },
    customizationsContainer: {
      marginBottom: spacing.sm,
    },
    customizationsTitle: {
      fontSize: fontSizes.sm,
      fontWeight: 'bold',
      color: theme.textColor,
      marginBottom: spacing.xs,
    },
    customizationRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: spacing.xs,
    },
    customizationName: {
      fontSize: fontSizes.xs,
      color: theme.secondaryColor,
      flex: 1,
    },
    customizationPrice: {
      fontSize: fontSizes.xs,
      color: theme.primaryColor,
      fontWeight: 'bold',
    },
    quantityContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: spacing.sm,
    },
    quantityButton: {
      width: 32,
      height: 32,
      backgroundColor: theme.primaryColor,
      borderRadius: borderRadius.sm,
      justifyContent: 'center',
      alignItems: 'center',
    },
    quantityButtonText: {
      color: '#fff',
      fontSize: fontSizes.md,
      fontWeight: 'bold',
    },
    quantityText: {
      fontSize: fontSizes.md,
      color: theme.textColor,
      marginHorizontal: spacing.md,
      minWidth: 30,
      textAlign: 'center',
    },
    itemActions: {
      alignItems: 'flex-end',
      justifyContent: 'space-between',
    },
    itemTotal: {
      fontSize: fontSizes.lg,
      fontWeight: 'bold',
      color: theme.textColor,
      marginBottom: spacing.sm,
    },
    removeButton: {
      backgroundColor: '#ff4444',
      borderRadius: borderRadius.sm,
      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.xs,
    },
    removeButtonText: {
      color: '#fff',
      fontSize: fontSizes.xs,
      fontWeight: 'bold',
    },
    summary: {
      backgroundColor: theme.backgroundColor,
      borderTopWidth: 1,
      borderTopColor: theme.borderColor,
      padding: spacing.md,
    },
    summaryRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: spacing.md,
    },
    summaryLabel: {
      fontSize: fontSizes.md,
      fontWeight: 'bold',
      color: theme.textColor,
    },
    summaryValue: {
      fontSize: fontSizes.lg,
      fontWeight: 'bold',
      color: theme.primaryColor,
    },
    checkoutButton: {
      backgroundColor: theme.primaryColor,
      borderRadius: borderRadius.md,
      paddingVertical: spacing.md,
      alignItems: 'center',
    },
    checkoutButtonText: {
      color: '#fff',
      fontSize: fontSizes.lg,
      fontWeight: 'bold',
    },
  });
}
