import { StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { spacing, fontSizes, borderRadius, buttonHeights, modalSizes } from '../utils/sizes';

export default function useCreateStyles() {
  const { theme } = useTheme();

  return StyleSheet.create({
    container: {
      backgroundColor: theme.backgroundColor,
      borderRadius: borderRadius.md,
      padding: spacing.lg,
      marginBottom: spacing.md,
      borderWidth: 1,
      borderColor: theme.borderColor,
      width: '100%',
    },
    title: {
      fontSize: fontSizes.lg,
      fontWeight: 'bold',
      color: theme.textColor,
      marginBottom: spacing.md,
    },
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
    input: {
      height: buttonHeights.lg,
      borderWidth: 1,
      borderColor: theme.borderColor,
      borderRadius: borderRadius.md,
      paddingHorizontal: spacing.md,
      fontSize: fontSizes.md,
      backgroundColor: theme.isDarkMode ? '#232323' : '#f9f9f9',
      color: theme.textColor,
    },
    inputFocused: {
      borderColor: theme.primaryColor,
      borderWidth: 2,
    },
    inputError: {
      borderColor: '#ff4444',
      borderWidth: 2,
    },
    errorText: {
      fontSize: fontSizes.sm,
      color: '#ff4444',
      marginTop: spacing.xs,
      marginLeft: spacing.sm,
    },
    row: {
      flexDirection: 'row',
      gap: spacing.md,
    },
    halfWidth: {
      flex: 1,
    },
    pickerContainer: {
      height: buttonHeights.lg,
      borderWidth: 1,
      borderColor: theme.borderColor,
      borderRadius: borderRadius.md,
      backgroundColor: theme.isDarkMode ? '#232323' : '#f9f9f9',
      justifyContent: 'center',
      overflow: 'hidden',
    },
    picker: {
      height: buttonHeights.lg,
      color: theme.textColor,
      backgroundColor: 'transparent',
    },
    pickerItemStyle: {
      fontSize: Math.round(fontSizes.md),
      height: modalSizes.dropdown.itemHeight,
      textAlign: 'center' as const,
    },
    // Modal styles for iOS - Bottom Sheet
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
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'flex-end',
    },
    modalContainer: {
      backgroundColor: theme.backgroundColor,
      borderTopLeftRadius: borderRadius.lg,
      borderTopRightRadius: borderRadius.lg,
      maxHeight: modalSizes.picker.maxHeight,
      minHeight: modalSizes.picker.minHeight,
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
    modalPickerContainer: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: theme.backgroundColor,
      paddingVertical: spacing.sm,
    },
    modalPicker: {
      width: '100%',
      backgroundColor: 'transparent',
    },
    modalPickerItem: {
      fontSize: Math.round(fontSizes.md),
      height: modalSizes.dropdown.itemHeight,
      color: theme.textColor,
      textAlign: 'center' as const,
    },
    checkboxContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: spacing.md,
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.xs,
    },
    checkbox: {
      width: 20,
      height: 20,
      borderWidth: 2,
      borderColor: theme.borderColor,
      borderRadius: borderRadius.sm,
      marginRight: spacing.md,
      alignItems: 'center',
      justifyContent: 'center',
    },
    checkboxChecked: {
      backgroundColor: theme.primaryColor,
      borderColor: theme.primaryColor,
    },
    checkboxText: {
      fontSize: fontSizes.md,
      color: theme.textColor,
      flex: 1,
      fontWeight: '500',
    },
    checkmark: {
      color: '#fff',
      fontSize: fontSizes.sm,
      fontWeight: 'bold',
    },
    saveAddressContainer: {
      marginTop: spacing.sm,
      paddingTop: spacing.sm,
      borderTopWidth: 1,
      borderTopColor: theme.borderColor,
    },
    disabledCheckbox: {
      opacity: 0.5,
    },
    disabledContainer: {
      opacity: 0.6,
    },
    disabledInput: {
      backgroundColor: theme.isDarkMode ? '#1a1a1a' : '#f0f0f0',
      color: theme.isDarkMode ? '#666' : '#999',
    },
    disabledText: {
      color: theme.isDarkMode ? '#666' : '#999',
    },
    disabledPickerContainer: {
      backgroundColor: theme.isDarkMode ? '#1a1a1a' : '#f0f0f0',
    },
  });
}

export type Styles = ReturnType<typeof useCreateStyles>;
