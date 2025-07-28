import { StyleSheet, Dimensions } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { spacing, fontSizes, borderRadius, buttonHeights } from '../utils/sizes';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export default function useCreateStyles() {
  const { theme } = useTheme();

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.backgroundColor,
    },
    title: {
      fontSize: fontSizes.xl,
      fontWeight: 'bold',
      color: theme.textColor,
      textAlign: 'center',
      marginVertical: spacing.lg,
    },
    formSection: {
      paddingHorizontal: spacing.lg,
      marginBottom: spacing.lg,
    },
    sectionTitle: {
      fontSize: fontSizes.lg,
      fontWeight: 'bold',
      color: theme.textColor,
      marginBottom: spacing.md,
    },
    inputContainer: {
      marginBottom: spacing.md,
    },
    label: {
      fontSize: fontSizes.md,
      color: theme.textColor,
      marginBottom: spacing.xs,
      fontWeight: '500',
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
    // Modal styles for iOS gender picker
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
      maxHeight: screenHeight * 0.4,
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
      height: 44,
      color: theme.textColor,
      textAlign: 'center' as const,
    },
    photoInstructions: {
      fontSize: fontSizes.sm,
      color: theme.secondaryColor,
      marginBottom: spacing.lg,
      lineHeight: 20,
    },
    photoSection: {
      gap: spacing.lg,
    },
    photoContainer: {
      alignItems: 'flex-start',
    },
    photoMainContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
    },
    photoImageSection: {
      width: screenWidth * 0.45, // Half the screen width minus padding
      alignItems: 'center',
    },
    photoButtonSection: {
      flex: 1,
      paddingLeft: spacing.lg,
      justifyContent: 'center',
      alignItems: 'center',
    },
    photoLabel: {
      fontSize: fontSizes.md,
      fontWeight: '500',
      color: theme.textColor,
      marginBottom: spacing.sm,
      alignSelf: 'flex-start',
    },
    previewImage: {
      width: '100%',
      aspectRatio: 9 / 16, // Maintain aspect ratio
      borderRadius: borderRadius.md,
      marginBottom: spacing.sm,
    },
    placeholderImage: {
      width: '100%',
      aspectRatio: 9 / 16, // Maintain aspect ratio
      borderWidth: 2,
      borderColor: theme.borderColor,
      borderStyle: 'dashed',
      borderRadius: borderRadius.md,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: spacing.sm,
      backgroundColor: theme.isDarkMode ? '#232323' : '#f9f9f9',
    },
    photoButtonsColumn: {
      gap: spacing.md,
      width: '100%',
    },
    photoButtonsRow: {
      flexDirection: 'row',
      gap: spacing.sm,
    },
    photoButton: {
      backgroundColor: theme.primaryColor,
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.lg,
      borderRadius: borderRadius.md,
      alignItems: 'center',
      minWidth: 100,
    },
    halfWidthButton: {
      flex: 1,
    },
    photoButtonText: {
      color: '#ffffff',
      fontSize: fontSizes.md,
      fontWeight: '500',
    },
    submitButton: {
      backgroundColor: theme.primaryColor,
      marginHorizontal: spacing.lg,
      paddingVertical: spacing.lg,
      borderRadius: borderRadius.md,
      alignItems: 'center',
      marginBottom: spacing.lg,
    },
    submitButtonText: {
      color: '#ffffff',
      fontSize: fontSizes.lg,
      fontWeight: 'bold',
    },
    resultsSection: {
      paddingHorizontal: spacing.lg,
      marginBottom: spacing.xl,
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
      textTransform: 'capitalize',
    },
    measurementValue: {
      fontSize: fontSizes.md,
      color: theme.primaryColor,
      fontWeight: '500',
    },
  });
}

export type Styles = ReturnType<typeof useCreateStyles>;
