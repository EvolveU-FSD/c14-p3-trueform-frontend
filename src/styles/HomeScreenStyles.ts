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
    bannerContainer: {
      width: '100%',
      height: 400,
      padding: spacing.sm,
      marginBottom: spacing.md,
    },
    bannerImage: {
      width: '100%',
      height: '100%',
      borderRadius: borderRadius.md,
    },
    startShoppingButton: {
      backgroundColor: theme.primaryColor,
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.lg,
      borderRadius: borderRadius.md,
      marginHorizontal: spacing.md,
      marginBottom: spacing.lg,
      alignItems: 'center',
    },
    startShoppingText: {
      color: theme.textColor,
      fontSize: fontSizes.md,
      fontWeight: 'bold',
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
    headerTitleContainer: {
      alignItems: 'center',
      paddingVertical: spacing.lg,
      marginBottom: spacing.sm,
    },
    mainTitle: {
      fontSize: fontSizes.xl,
      fontWeight: 'bold',
      color: theme.textColor,
    },
    mainSubtitle: {
      fontSize: fontSizes.md,
      color: theme.secondaryColor,
      marginTop: spacing.xs,
    },
  });
}

export type Styles = ReturnType<typeof useCreateStyles>;
