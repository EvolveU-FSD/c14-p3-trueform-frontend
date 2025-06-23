import { StyleSheet } from 'react-native';
import { spacing, fontSizes, borderRadius } from '../utils/sizes';
import { Theme } from '../theme/ThemeContext';

export function createStyles(theme: Theme) {
  return StyleSheet.create({
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.backgroundColor,
    },
    container: {
      flex: 1,
      backgroundColor: theme.backgroundColor,
    },
    contentContainer: {
      padding: spacing.md,
    },
    title: {
      fontSize: fontSizes.lg,
      fontWeight: '600',
      color: theme.textColor,
      marginBottom: spacing.md,
      paddingHorizontal: spacing.md,
    },
    subtitle: {
      fontSize: fontSizes.md,
      color: theme.secondaryColor,
      marginBottom: spacing.lg,
      paddingHorizontal: spacing.md,
    },
    errorContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: spacing.lg,
    },
    errorText: {
      fontSize: fontSizes.md,
      color: 'red',
      textAlign: 'center',
    },
    optionsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      padding: spacing.md,
    },
    optionItem: {
      width: '48%',
      marginBottom: spacing.md,
      borderRadius: borderRadius.md,
      backgroundColor: theme.borderColor,
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: theme.borderColor,
    },
    selectedOption: {
      borderColor: theme.primaryColor,
      backgroundColor: theme.primaryColor + '10', // 10% opacity
    },
    optionImage: {
      width: '100%',
      aspectRatio: 1,
      backgroundColor: theme.backgroundColor,
    },
    optionContent: {
      padding: spacing.sm,
    },
    optionTitle: {
      fontSize: fontSizes.sm,
      fontWeight: '600',
      color: theme.textColor,
      textAlign: 'center',
      marginBottom: spacing.xs,
    },
    optionDescription: {
      fontSize: fontSizes.xs,
      color: theme.secondaryColor,
      textAlign: 'center',
    },
    imageLoader: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: [{ translateX: -12 }, { translateY: -12 }],
    },
  });
}
