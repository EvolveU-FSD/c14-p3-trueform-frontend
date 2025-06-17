import { StyleSheet } from 'react-native';
import { spacing, fontSizes, borderRadius } from '../utils/sizes';
import { Theme } from '../theme/ThemeContext';

export function createStyles(theme: Theme) {
  return StyleSheet.create({
    btn: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: spacing.sm,
      alignSelf: 'flex-start',
      backgroundColor: 'transparent',
      borderRadius: borderRadius.lg,
    },
    icon: {
      fontWeight: 'bold',
      color: theme.textColor,
    },
    label: {
      marginLeft: spacing.xs,
      fontSize: fontSizes.md,
      fontWeight: '500',
      color: theme.textColor,
    },
  });
}
