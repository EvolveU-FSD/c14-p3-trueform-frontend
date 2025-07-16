import { StyleSheet } from 'react-native';
import { spacing, fontSizes, iconSizes } from '../utils/sizes';
import { useTheme } from '../theme/ThemeContext';

export default function useCreateStyles() {
  const { theme } = useTheme();

  return StyleSheet.create({
    container: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      flexDirection: 'row',
      backgroundColor: theme.backgroundColor,
      borderTopWidth: 1,
      borderTopColor: theme.borderColor,
      paddingVertical: spacing.xs,
      paddingHorizontal: spacing.xs,
      paddingBottom: spacing.md,
      elevation: 8,
      shadowColor: theme.textColor,
      shadowOffset: { width: 0, height: -2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    tabButton: {
      flex: 1,
      alignItems: 'center',
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.xs,
    },
    tabIcon: {
      fontSize: iconSizes.lg,
      marginBottom: spacing.xs,
      color: theme.secondaryColor,
    },
    activeTabIcon: {
      color: theme.primaryColor,
    },
    tabLabel: {
      fontSize: fontSizes.sm,
      color: theme.secondaryColor,
      fontWeight: '400',
      textAlign: 'center',
    },
    activeTabLabel: {
      color: theme.primaryColor,
      fontWeight: '600',
    },
  });
}

export type Styles = ReturnType<typeof useCreateStyles>;
