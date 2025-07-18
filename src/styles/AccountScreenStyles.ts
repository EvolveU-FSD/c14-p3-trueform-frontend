import { StyleSheet } from 'react-native';
import { spacing, fontSizes, borderRadius, buttonHeights } from '../utils/sizes';
import { useTheme } from '../theme/ThemeContext';

export default function useCreateStyles() {
  const { theme } = useTheme();

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.backgroundColor,
    },
    content: {
      flex: 1,
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.md,
    },
    // Guest User Styles
    welcomeSection: {
      alignItems: 'center',
      paddingVertical: spacing.xxl,
      marginBottom: spacing.xl,
    },
    welcomeTitle: {
      fontSize: fontSizes.xl,
      fontWeight: 'bold',
      color: theme.textColor,
      marginTop: spacing.lg,
      marginBottom: spacing.sm,
      textAlign: 'center',
    },
    welcomeSubtitle: {
      fontSize: fontSizes.md,
      color: theme.secondaryColor,
      textAlign: 'center',
      lineHeight: 22,
      maxWidth: 300,
    },
    buttonContainer: {
      width: '100%',
      gap: spacing.md,
      marginBottom: spacing.xl,
    },
    primaryButton: {
      backgroundColor: theme.primaryColor,
      paddingVertical: spacing.lg,
      borderRadius: borderRadius.md,
      alignItems: 'center',
      justifyContent: 'center',
      height: buttonHeights.lg,
    },
    primaryButtonText: {
      color: '#ffffff',
      fontSize: fontSizes.md,
      fontWeight: '600',
    },
    secondaryButton: {
      backgroundColor: 'transparent',
      borderWidth: 2,
      borderColor: theme.primaryColor,
      paddingVertical: spacing.lg,
      borderRadius: borderRadius.md,
      alignItems: 'center',
      justifyContent: 'center',
      height: buttonHeights.lg,
    },
    secondaryButtonText: {
      color: theme.primaryColor,
      fontSize: fontSizes.md,
      fontWeight: '600',
    },
    guestSection: {
      alignItems: 'center',
      marginTop: spacing.lg,
    },
    guestText: {
      fontSize: fontSizes.sm,
      color: theme.secondaryColor,
    },
    // Authenticated User Styles
    profileSection: {
      alignItems: 'center',
      paddingVertical: spacing.xl,
      marginBottom: spacing.lg,
      borderBottomWidth: 1,
      borderBottomColor: theme.borderColor,
    },
    avatarContainer: {
      marginBottom: spacing.md,
    },
    userName: {
      fontSize: fontSizes.lg,
      fontWeight: 'bold',
      color: theme.textColor,
      marginBottom: spacing.xs,
    },
    userEmail: {
      fontSize: fontSizes.md,
      color: theme.secondaryColor,
    },
    menuSection: {
      marginBottom: spacing.xl,
    },
    menuItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: spacing.lg,
      paddingHorizontal: spacing.md,
      backgroundColor: theme.isDarkMode ? '#232323' : '#f9f9f9',
      borderRadius: borderRadius.md,
      marginBottom: spacing.sm,
    },
    menuItemText: {
      flex: 1,
      fontSize: fontSizes.md,
      color: theme.textColor,
      marginLeft: spacing.md,
      fontWeight: '500',
    },
    logoutSection: {
      marginTop: spacing.lg,
      paddingTop: spacing.lg,
      borderTopWidth: 1,
      borderTopColor: theme.borderColor,
    },
    logoutButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: spacing.lg,
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: '#ff4757',
      borderRadius: borderRadius.md,
    },
    logoutButtonText: {
      fontSize: fontSizes.md,
      color: '#ff4757',
      fontWeight: '600',
      marginLeft: spacing.sm,
    },
  });
}

export type Styles = ReturnType<typeof useCreateStyles>;
