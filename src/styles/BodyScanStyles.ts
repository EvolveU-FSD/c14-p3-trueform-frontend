import { StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { spacing, fontSizes, borderRadius } from '../utils/sizes';

export default function createStyles() {
  const { theme } = useTheme();

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.backgroundColor,
      padding: spacing.md,
    },
    title: {
      fontSize: fontSizes.xl,
      fontWeight: 'bold',
      marginBottom: spacing.lg,
      textAlign: 'center',
      color: theme.textColor,
    },
    formSection: {
      marginBottom: spacing.lg,
      backgroundColor: theme.backgroundColor,
      borderRadius: borderRadius.md,
      padding: spacing.md,
    },
    sectionTitle: {
      fontSize: fontSizes.lg,
      fontWeight: 'bold',
      marginBottom: spacing.md,
      color: theme.textColor,
    },
    inputContainer: {
      marginBottom: spacing.md,
    },
    label: {
      fontSize: fontSizes.md,
      marginBottom: spacing.sm,
      color: theme.textColor,
    },
    input: {
      borderWidth: 1,
      borderColor: theme.borderColor,
      borderRadius: borderRadius.sm,
      padding: spacing.sm,
      fontSize: fontSizes.md,
      backgroundColor: theme.backgroundColor,
      color: theme.textColor,
    },
    pickerContainer: {
      borderWidth: 1,
      borderColor: theme.borderColor,
      borderRadius: borderRadius.sm,
      backgroundColor: theme.backgroundColor,
    },
    picker: {
      height: 50,
    },
    photoInstructions: {
      marginBottom: spacing.md,
      fontSize: fontSizes.sm,
      color: theme.secondaryColor,
      lineHeight: 20,
    },
    photoSection: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    photoContainer: {
      width: '48%',
      alignItems: 'center',
    },
    photoLabel: {
      marginBottom: spacing.sm,
      fontSize: fontSizes.sm,
      fontWeight: 'bold',
      color: theme.textColor,
    },
    placeholderImage: {
      width: '100%',
      height: 200,
      backgroundColor: theme.borderColor,
      borderRadius: borderRadius.md,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: spacing.sm,
    },
    previewImage: {
      width: '100%',
      height: 200,
      borderRadius: borderRadius.md,
      marginBottom: spacing.sm,
    },
    photoButton: {
      backgroundColor: theme.borderColor,
      padding: spacing.sm,
      borderRadius: borderRadius.sm,
      width: '100%',
      alignItems: 'center',
    },
    photoButtonText: {
      fontSize: fontSizes.sm,
      color: theme.textColor,
    },
    submitButton: {
      backgroundColor: theme.primaryColor,
      padding: spacing.md,
      borderRadius: borderRadius.md,
      alignItems: 'center',
      marginBottom: spacing.lg,
    },
    submitButtonText: {
      color: '#fff',
      fontSize: fontSizes.md,
      fontWeight: 'bold',
    },
    resultsSection: {
      marginBottom: spacing.lg,
      backgroundColor: theme.backgroundColor,
      borderRadius: borderRadius.md,
      padding: spacing.md,
    },
    measurementRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: spacing.sm,
      borderBottomWidth: 1,
      borderBottomColor: theme.borderColor,
    },
    measurementLabel: {
      fontSize: fontSizes.md,
      color: theme.textColor,
    },
    measurementValue: {
      fontSize: fontSizes.md,
      fontWeight: 'bold',
      color: theme.textColor,
    },
    photoButtonsRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
    },
    halfWidthButton: {
      width: '48%',
    },
  });
}
