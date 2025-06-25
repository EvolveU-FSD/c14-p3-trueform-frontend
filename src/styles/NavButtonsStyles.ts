import { StyleSheet } from 'react-native';
import { spacing, fontSizes } from '../utils/sizes';
import { useTheme } from '../theme/ThemeContext';

export default function useCreateStyles() {
  const { theme } = useTheme();

  return StyleSheet.create({
    scrollContainer: {
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.md,
      marginBottom: 1,
      marginLeft: 1,
      backgroundColor: theme.backgroundColor,
    },
    button: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
      backgroundColor: theme.borderColor,
      marginRight: spacing.md,
    },
    activeButton: {
      backgroundColor: theme.primaryColor,
    },
    icon: {
      fontSize: fontSizes.lg,
      marginRight: spacing.xs + 2,
      color: theme.textColor,
    },
    activeIcon: {
      color: '#FFFFFF',
    },
    label: {
      fontSize: fontSizes.sm,
      fontWeight: '500',
      color: theme.textColor,
    },
    activeLabel: {
      color: '#FFFFFF',
    },
  });
}

export type Styles = ReturnType<typeof useCreateStyles>;
