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
    bannerContainer: {
      width: '100%',
      height: 400,
      padding: spacing.sm,
      marginBottom: spacing.md,
    },
    bannerImage: {
      width: '100%',
      height: '100%',
      borderRadius: borderRadius.md,
    },
    startShoppingButton: {
      backgroundColor: theme.primaryColor,
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.lg,
      borderRadius: borderRadius.md,
      marginHorizontal: spacing.md,
      marginBottom: spacing.lg,
      alignItems: 'center',
    },
    startShoppingText: {
      color: theme.textColor,
      fontSize: fontSizes.md,
      fontWeight: 'bold',
    },
    headerTitleContainer: {
      alignItems: 'center',
      paddingVertical: spacing.md,
      marginBottom: spacing.xs,
    },
    mainTitle: {
      fontSize: fontSizes.lg,
      fontWeight: 'bold',
      color: theme.textColor,
    },
    mainSubtitle: {
      fontSize: fontSizes.sm,
      color: theme.secondaryColor,
      marginTop: spacing.xs,
    },
  });
}

export type Styles = ReturnType<typeof useCreateStyles>;
