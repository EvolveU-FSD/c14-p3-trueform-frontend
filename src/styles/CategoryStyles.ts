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
    centerContent: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    gridContainer: {
      padding: spacing.md,
      paddingBottom: spacing.xl,
    },
    columnWrapper: {
      justifyContent: 'space-between',
      marginBottom: spacing.md,
    },
    categoryCard: {
      width: '48%',
      backgroundColor: theme.backgroundColor,
      borderRadius: borderRadius.md,
      overflow: 'hidden',
      shadowColor: theme.textColor,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
      borderWidth: 1,
      borderColor: theme.borderColor,
    },
    categoryImage: {
      width: '100%',
      height: 200,
      backgroundColor: theme.borderColor,
    },
    categoryContent: {
      padding: spacing.sm,
    },
    categoryName: {
      fontSize: fontSizes.md,
      fontWeight: '600',
      color: theme.textColor,
      marginBottom: spacing.xs,
    },
    categoryType: {
      fontSize: fontSizes.sm,
      color: theme.primaryColor,
      fontWeight: '500',
      marginBottom: spacing.xs,
    },
    errorText: {
      fontSize: fontSizes.lg,
      color: 'red',
      textAlign: 'center',
      marginTop: spacing.md,
    },
  });
}

export type Styles = ReturnType<typeof useCreateStyles>;
