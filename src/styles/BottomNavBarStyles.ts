import { StyleSheet } from 'react-native';
import { spacing, fontSizes, iconSizes } from '../utils/sizes';
import { useTheme } from '../theme/ThemeContext';

export default function useCreateStyles() {
  const { theme } = useTheme();

  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      backgroundColor: theme.backgroundColor,
      borderTopWidth: 1,
      borderTopColor: theme.borderColor,
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.xs,
    },
    tabButton: {
      flex: 1,
      alignItems: 'center',
      paddingVertical: spacing.sm,
    },
    tabIcon: {
      fontSize: iconSizes.md,
      marginBottom: spacing.xs / 2,
      color: theme.iconColorInactive,
    },
    activeTabIcon: {
      color: theme.iconColorActive,
    },
    tabLabel: {
      fontSize: fontSizes.xs,
      color: theme.iconColorInactive,
    },
    activeTabLabel: {
      color: theme.iconColorActive,
      fontWeight: '500',
    },
  });
}
