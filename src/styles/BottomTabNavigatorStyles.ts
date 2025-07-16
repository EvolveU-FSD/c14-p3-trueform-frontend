import { StyleSheet } from 'react-native';
import { spacing, fontSizes, iconSizes } from '../utils/sizes';
import { useTheme } from '../theme/ThemeContext';

export default function useCreateStyles() {
  const { theme } = useTheme();

  return StyleSheet.create({
    tabBarStyle: {
      backgroundColor: theme.backgroundColor,
      borderTopColor: theme.borderColor,
      borderTopWidth: 1,
      paddingVertical: spacing.xs,
      paddingBottom: spacing.md,
      height: 80,
      elevation: 8,
      shadowColor: theme.textColor,
      shadowOffset: { width: 0, height: -2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    tabBarLabelStyle: {
      fontSize: fontSizes.sm,
      fontWeight: '400',
      marginTop: spacing.xs,
    },
    tabBarIcon: {
      fontSize: iconSizes.lg,
    },
    tabBarActiveTintColor: theme.primaryColor,
    tabBarInactiveTintColor: theme.secondaryColor,
  });
}

export type Styles = ReturnType<typeof useCreateStyles>;
