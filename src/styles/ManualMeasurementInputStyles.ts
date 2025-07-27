import { StyleSheet } from 'react-native';
import { spacing, borderRadius } from '../utils/sizes';
import { useTheme } from '../theme/ThemeContext';

export default function useManualMeasurementInputStyles() {
  const { theme } = useTheme();
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.backgroundColor,
    },
    scrollContent: {
      paddingBottom: spacing.sm,
    },
    imageContainer: {
      width: '100%',
      height: 220,
      marginBottom: spacing.lg,
    },
    image: {
      width: '100%',
      height: '100%',
      borderRadius: borderRadius.lg,
    },
    bulletRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: spacing.xs,
      marginLeft: spacing.md,
    },
    bulletIcon: {
      color: '#B22222',
      fontSize: 18,
      marginRight: spacing.xs,
      marginTop: 2,
    },
    unitToggleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: spacing.md,
      justifyContent: 'flex-start',
      marginLeft: spacing.xl,
    },
    unitLabel: {
      fontWeight: 'bold',
      color: theme.textColor,
      marginRight: spacing.sm + 4,
    },
    unitButton: {
      paddingVertical: 6,
      paddingHorizontal: 18,
      borderRadius: borderRadius.md,
      marginRight: spacing.sm,
    },
    fitToggleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: spacing.lg,
      justifyContent: 'flex-start',
      marginLeft: spacing.xl,
    },
    fitLabel: {
      fontWeight: 'bold',
      color: theme.textColor,
      marginRight: spacing.sm + 4,
    },
    fitButton: {
      paddingVertical: 6,
      paddingHorizontal: 18,
      borderRadius: borderRadius.md,
      marginRight: spacing.sm,
    },
    measurementSection: {
      marginBottom: spacing.xl,
      alignItems: 'center',
    },
    sectionTitle: {
      fontWeight: 'bold',
      color: theme.textColor,
      marginBottom: spacing.sm,
      textAlign: 'center',
    },
    measurementGrid: {
      flexDirection: 'column',
      flexWrap: 'nowrap',
      alignItems: 'center',
      width: '100%',
      gap: 0,
    },
    measurementRow: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'flex-start',
      width: '90%',
      marginBottom: spacing.sm,
    },
    measurementBox: {
      flex: 1,
      backgroundColor: '#f5f5f5',
      borderRadius: borderRadius.md,
      marginHorizontal: spacing.xs,
      alignItems: 'center',
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.sm,
      borderWidth: 1,
      borderColor: '#ddd',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      minWidth: 0,
      maxWidth: '48%',
    },
    measurementLabel: {
      color: theme.textColor,
      fontWeight: '500',
      fontSize: 15,
      marginBottom: 4,
      textAlign: 'center',
    },
    measurementInput: {
      borderWidth: 1,
      borderColor: '#888',
      borderRadius: borderRadius.md,
      paddingVertical: 4,
      paddingHorizontal: 10,
      width: '90%',
      textAlign: 'center',
      color: '#222',
      backgroundColor: '#e5e5e5',
      fontWeight: '500',
      fontSize: 15,
      marginBottom: 4,
      marginTop: 2,
      alignSelf: 'center',
    },
    measurementUnit: {
      color: theme.secondaryColor,
      fontSize: 13,
      alignSelf: 'center',
      minWidth: 30,
      textAlign: 'center',
    },
    actionRow: {
      flexDirection: 'column',
      gap: spacing.md,
      marginHorizontal: spacing.lg,
      marginBottom: spacing.lg,
    },
    backButton: {
      backgroundColor: theme.borderColor,
      paddingVertical: spacing.lg,
      borderRadius: borderRadius.md,
      alignItems: 'center',
      width: '100%',
    },
    addToCartButton: {
      backgroundColor: theme.primaryColor,
      paddingVertical: spacing.lg,
      borderRadius: borderRadius.md,
      alignItems: 'center',
      width: '100%',
    },
    buttonText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 15,
    },
    backButtonText: {
      color: theme.textColor,
      fontWeight: 'bold',
      fontSize: 15,
    },
  });
}
