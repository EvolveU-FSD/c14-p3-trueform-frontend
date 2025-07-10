import { StyleSheet, Platform } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { spacing, fontSizes, borderRadius, buttonHeights } from '../utils/sizes';

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
    inputMultiline: {
      height: undefined,
      minHeight: buttonHeights.lg,
      textAlignVertical: 'top',
      paddingTop: spacing.sm,
    },
    errorText: {
      fontSize: fontSizes.sm,
      color: '#ff4444',
      marginTop: spacing.xs,
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
      marginTop: Platform.OS === 'ios' ? -70 : 0,
    },
    pickerItemStyle: {
      fontSize: 16,
      height: 120,
      textAlign: 'center',
    },
    checkboxContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: spacing.md,
    },
    checkbox: {
      width: 20,
      height: 20,
      borderWidth: 2,
      borderColor: theme.borderColor,
      borderRadius: borderRadius.sm,
      marginRight: spacing.sm,
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
    },
    checkmark: {
      color: '#fff',
      fontSize: fontSizes.sm,
      fontWeight: 'bold',
    },
  });
}

export type Styles = ReturnType<typeof useCreateStyles>;
