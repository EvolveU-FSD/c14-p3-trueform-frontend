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
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    optionsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      padding: spacing.md,
      gap: spacing.md,
    },
    optionBox: {
      width: '48%',
      aspectRatio: 1,
      backgroundColor: theme.borderColor,
      borderRadius: borderRadius.md,
      padding: spacing.sm,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: theme.borderColor,
    },
    optionBoxSelected: {
      borderColor: theme.primaryColor,
      backgroundColor: `${theme.primaryColor}10`,
    },
    optionImage: {
      width: '80%',
      height: '80%',
      marginBottom: spacing.sm,
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
    // Grid styles
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
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
      height: 300,
      paddingBottom: spacing.xxxl,
    },
    itemImage: {
      width: '100%',
      height: '100%',
    },
    itemContent: {
      flex: 1,
      justifyContent: 'center',
      margin: spacing.sm,
      marginTop: spacing.xs
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
    // Error and loading states
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
    // Navigation
    backButton: {
      padding: spacing.sm,
    },
  });
}

export type Styles = ReturnType<typeof useCreateStyles>;
