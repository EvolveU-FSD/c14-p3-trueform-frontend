import { StyleSheet } from 'react-native';
import { spacing, fontSizes, borderRadius } from '../utils/sizes';
import { Theme } from '../theme/ThemeContext';

export function createStyles(theme: Theme) {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      padding: spacing.sm,
      justifyContent: 'space-between',
    },
    option: {
      width: '48%',
      marginBottom: spacing.md,
      padding: spacing.sm,
      borderRadius: borderRadius.md,
      backgroundColor: theme.borderColor,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: theme.secondaryColor,
    },
    selectedOption: {
      backgroundColor: theme.primaryColor,
      borderColor: theme.primaryColor,
    },
    optionImage: {
      width: '100%',
      height: 120,
      resizeMode: 'contain',
      marginBottom: spacing.sm,
    },
    optionTitle: {
      fontSize: fontSizes.sm,
      fontWeight: '600',
      textAlign: 'center',
      color: theme.textColor,
    },
    optionDescription: {
      fontSize: fontSizes.xs,
      color: theme.secondaryColor,
      textAlign: 'center',
      marginTop: spacing.xs,
    },
  });
}
