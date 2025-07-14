import { StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { spacing, fontSizes, borderRadius } from '../utils/sizes';

export default function useCreateStyles() {
  const { theme } = useTheme();

  return StyleSheet.create({
    container: {
      backgroundColor: theme.backgroundColor,
      padding: spacing.lg,
      marginTop: spacing.md,
      borderRadius: borderRadius.md,
      borderWidth: 1,
      borderColor: theme.borderColor,
    },
    summaryRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: spacing.sm,
    },
    summaryLabel: {
      fontSize: fontSizes.md,
      color: theme.secondaryColor,
    },
    summaryValue: {
      fontSize: fontSizes.md,
      fontWeight: '500',
      color: theme.textColor,
    },
    divider: {
      height: 1,
      backgroundColor: theme.borderColor,
      marginVertical: spacing.sm,
    },
    totalRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: spacing.xs,
    },
    totalLabel: {
      fontSize: fontSizes.lg,
      fontWeight: '600',
      color: theme.textColor,
    },
    totalValue: {
      fontSize: fontSizes.xl,
      fontWeight: 'bold',
      color: theme.primaryColor,
    },
  });
}

export type Styles = ReturnType<typeof useCreateStyles>;
