import { StyleSheet, Dimensions } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { spacing, fontSizes, borderRadius } from '../utils/sizes';

const screenWidth = Dimensions.get('window').width;

export default function useCreateStyles() {
  const { theme } = useTheme();

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.backgroundColor,
    },
    scrollContainer: {
      paddingBottom: spacing.xl,
    },
    centerContent: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    imageGallery: {
      width: screenWidth,
      height: 260,
      marginBottom: spacing.sm,
    },
    image: {
      width: screenWidth - spacing.lg * 2,
      height: 220,
      borderRadius: borderRadius.lg,
      marginHorizontal: spacing.sm,
      backgroundColor: theme.borderColor,
    },
    imageIndicatorContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: spacing.sm,
    },
    imageIndicator: {
      width: spacing.sm,
      height: spacing.sm,
      borderRadius: borderRadius.sm,
      backgroundColor: theme.borderColor,
      margin: 3,
    },
    detailsContainer: {
      paddingHorizontal: spacing.lg,
      paddingBottom: spacing.xl,
      paddingTop: spacing.sm,
    },
    name: {
      fontSize: fontSizes.xl,
      fontWeight: 'bold',
      marginBottom: spacing.sm,
      color: theme.textColor,
    },
    price: {
      fontSize: fontSizes.lg,
      color: theme.primaryColor,
      fontWeight: '600',
      marginBottom: spacing.md,
    },
    desc: {
      fontSize: fontSizes.md,
      color: theme.secondaryColor,
      lineHeight: 22,
      marginBottom: spacing.md,
    },
    customizeBtn: {
      backgroundColor: theme.primaryColor,
      paddingVertical: spacing.lg,
      borderRadius: borderRadius.md,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: spacing.lg,
    },
    customizeBtnText: {
      color: '#ffffff',
      fontSize: fontSizes.md,
      fontWeight: '600',
    },
    notFound: {
      fontSize: fontSizes.lg,
      color: theme.secondaryColor,
      textAlign: 'center',
      marginHorizontal: spacing.md,
    },
    itemCount: {
      fontSize: fontSizes.sm,
      color: theme.secondaryColor,
      padding: spacing.md,
      textAlign: 'center',
    },
    // Navigation
    backButton: {
      padding: spacing.sm,
      minHeight: 44,
      minWidth: 44,
      justifyContent: 'center',
      alignItems: 'center',
    },
    metaContainer: {
      marginBottom: spacing.md,
    },
    meta: {
      fontSize: fontSizes.sm,
      color: theme.secondaryColor,
      marginBottom: spacing.xs,
    },
    customRow: {
      marginBottom: spacing.sm,
    },
    customLabel: {
      fontSize: fontSizes.md,
      color: theme.textColor,
      marginBottom: spacing.xs,
    },
    customOptionBtn: {
      paddingVertical: spacing.xs,
      paddingHorizontal: spacing.sm,
      borderRadius: borderRadius.lg,
      backgroundColor: theme.borderColor,
      marginRight: spacing.sm,
    },
    customOptionBtnActive: {
      backgroundColor: theme.primaryColor,
    },
    customOptionText: {
      color: theme.textColor,
    },
    customOptionTextActive: {
      color: '#fff',
      fontWeight: 'bold',
    },
    customHint: {
      color: theme.primaryColor,
      marginTop: spacing.sm,
      fontSize: fontSizes.sm,
    },
    fabricSection: {
      width: '100%',
      marginTop: spacing.md,
      marginBottom: spacing.sm,
      backgroundColor: theme.isDarkMode ? '#232323' : '#f9f9f9',
      borderRadius: borderRadius.md,
      padding: spacing.md,
    },
    fabricTitle: {
      fontWeight: 'bold',
      fontSize: fontSizes.md,
      marginBottom: spacing.xs,
      color: theme.textColor,
    },
    fabricDetail: {
      fontSize: fontSizes.md,
      color: theme.secondaryColor,
    },
    collapseHeader: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.xs,
      backgroundColor: theme.borderColor,
      borderRadius: borderRadius.md,
      marginTop: spacing.md,
    },
    collapseHeaderText: {
      fontWeight: 'bold',
      fontSize: fontSizes.md,
      color: theme.textColor,
    },
    collapseHeaderIcon: {
      fontSize: fontSizes.lg,
      color: theme.secondaryColor,
    },
  });
}

export type Styles = ReturnType<typeof useCreateStyles>;
