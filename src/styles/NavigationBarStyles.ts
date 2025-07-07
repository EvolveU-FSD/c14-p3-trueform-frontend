import { StyleSheet } from 'react-native';
import { spacing, fontSizes, borderRadius } from '../utils/sizes';
import { useTheme } from '../theme/ThemeContext';

export default function useCreateStyles() {
  const { theme } = useTheme();

  return StyleSheet.create({
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
      borderBottomWidth: 1,
      borderBottomColor: theme.borderColor,
      backgroundColor: theme.backgroundColor,
      zIndex: 1000,
      elevation: 5, // For Android
    },
    menuButton: {
      padding: spacing.sm,
    },
    menuIcon: {
      fontSize: fontSizes.lg,
      color: theme.textColor,
    },
    headerRight: {
      flexDirection: 'row',
    },
    loginButton: {
      padding: spacing.sm,
      marginLeft: spacing.xs,
    },
    loginText: {
      fontSize: fontSizes.md,
      color: theme.textColor,
      fontWeight: '500',
    },
    iconButton: {
      padding: spacing.sm,
      marginLeft: spacing.xs,
    },
    icon: {
      fontSize: fontSizes.lg,
      color: theme.textColor,
    },
    dropdown: {
      position: 'absolute',
      top: spacing.xxl,
      left: spacing.md,
      backgroundColor: theme.backgroundColor,
      padding: spacing.sm,
      borderRadius: borderRadius.md,
      elevation: 5,
      zIndex: 1000,
      minWidth: 200,
      borderWidth: 1,
      borderColor: theme.borderColor,
    },
    menuItem: {
      backgroundColor: theme.backgroundColor,
      borderBottomWidth: 1,
      borderBottomColor: theme.borderColor,
    },
    menuItemText: {
      fontSize: fontSizes.sm,
      color: theme.textColor,
      padding: spacing.sm,
    },
    categoryHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: spacing.none,
    },
    submenu: {
      marginLeft: spacing.md,
      backgroundColor: theme.backgroundColor,
    },
    submenuItem: {
      padding: spacing.sm,
      borderBottomWidth: 1,
      borderBottomColor: theme.borderColor,
    },
    socialContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingVertical: spacing.md,
      borderTopWidth: 1,
      borderTopColor: theme.borderColor,
      marginTop: spacing.sm,
    },
    socialIcon: {
      padding: spacing.sm,
      borderRadius: borderRadius.full,
      backgroundColor: theme.borderColor,
    },
    accountContainer: {
      position: 'relative',
    },
    accountButton: {
      padding: spacing.sm,
      borderRadius: borderRadius.lg,
      backgroundColor: 'transparent',
    },
    accountDropdown: {
      position: 'absolute',
      top: spacing.xxl,
      right: 0,
      backgroundColor: theme.backgroundColor,
      borderRadius: borderRadius.md,
      shadowColor: theme.isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      minWidth: 120,
      zIndex: 1000,
      borderWidth: 1,
      borderColor: theme.borderColor,
    },
    accountMenuItem: {
      padding: spacing.sm,
      borderBottomWidth: 1,
      borderBottomColor: theme.borderColor,
    },
    accountMenuText: {
      fontSize: fontSizes.md,
      color: theme.textColor,
    },
  });
}

export type Styles = ReturnType<typeof useCreateStyles>;
