import { StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { fontSizes, spacing, borderRadius } from '../utils/sizes';

export default function useCreateStyles() {
  const { theme } = useTheme();

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.backgroundColor,
    },
    title: {
      fontSize: fontSizes.xl,
      fontWeight: 'bold',
      color: theme.textColor,
      marginBottom: spacing.md,
      paddingHorizontal: spacing.md,
      paddingTop: spacing.md,
    },
    subtitle: {
      fontSize: fontSizes.md,
      color: theme.secondaryColor,
      textAlign: 'center',
      marginTop: spacing.xl,
    },
    itemsContainer: {
      paddingHorizontal: spacing.md,
      paddingTop: spacing.md,
    },
    itemsList: {
      paddingBottom: spacing.lg,
    },
    checkoutButton: {
      backgroundColor: theme.primaryColor,
      paddingVertical: spacing.lg,
      marginHorizontal: spacing.md,
      marginVertical: spacing.md,
      borderRadius: borderRadius.md,
      alignItems: 'center',
      justifyContent: 'center',
    },
    checkoutButtonText: {
      color: '#ffffff',
      fontSize: fontSizes.lg,
      fontWeight: '600',
    },
  });
}

export type Styles = ReturnType<typeof useCreateStyles>;
