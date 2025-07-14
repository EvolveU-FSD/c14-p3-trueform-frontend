import { StyleSheet, Dimensions } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { spacing, fontSizes, borderRadius, buttonHeights } from '../utils/sizes';

const { height: screenHeight } = Dimensions.get('window');

export default function useCreateStyles() {
  const { theme } = useTheme();

  return StyleSheet.create({
    fieldContainer: {
      marginBottom: spacing.md,
    },
    label: {
      fontSize: fontSizes.md,
      fontWeight: '500',
      color: theme.textColor,
      marginBottom: spacing.sm,
    },
    requiredIndicator: {
      color: '#ff4444',
    },
    modalTrigger: {
      height: buttonHeights.lg,
      borderWidth: 1,
      borderColor: theme.borderColor,
      borderRadius: borderRadius.md,
      backgroundColor: theme.isDarkMode ? '#232323' : '#f9f9f9',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: spacing.md,
    },
    modalTriggerText: {
      fontSize: fontSizes.md,
      color: theme.textColor,
      flex: 1,
    },
    placeholderText: {
      color: theme.isDarkMode ? '#888' : '#999',
    },
    inputError: {
      borderColor: '#ff4444',
      borderWidth: 2,
    },
    errorText: {
      fontSize: fontSizes.sm,
      color: '#ff4444',
      marginTop: spacing.xs,
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'flex-end',
    },
    modalContainer: {
      backgroundColor: theme.backgroundColor,
      borderTopLeftRadius: borderRadius.lg,
      borderTopRightRadius: borderRadius.lg,
      maxHeight: screenHeight * 0.6,
      minHeight: screenHeight * 0.3,
    },
    modalHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: theme.borderColor,
      backgroundColor: theme.backgroundColor,
      borderTopLeftRadius: borderRadius.lg,
      borderTopRightRadius: borderRadius.lg,
    },
    modalTitle: {
      fontSize: fontSizes.lg,
      fontWeight: '600',
      color: theme.textColor,
    },
    modalButton: {
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.md,
    },
    modalButtonText: {
      fontSize: fontSizes.md,
      color: theme.primaryColor,
    },
    modalConfirmText: {
      fontWeight: '600',
    },
    addressListContainer: {
      flex: 1,
      paddingHorizontal: spacing.lg,
    },
    addressItem: {
      paddingVertical: spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: theme.borderColor,
    },
    selectedAddressItem: {
      backgroundColor: theme.primaryColor + '20',
    },
    addressText: {
      fontSize: fontSizes.md,
      color: theme.textColor,
      marginBottom: spacing.xs,
    },
    addressSubText: {
      fontSize: fontSizes.sm,
      color: theme.secondaryColor,
    },
    noAddressesText: {
      fontSize: fontSizes.md,
      color: theme.secondaryColor,
      textAlign: 'center',
      paddingVertical: spacing.xl,
    },
  });
}

export type Styles = ReturnType<typeof useCreateStyles>;
