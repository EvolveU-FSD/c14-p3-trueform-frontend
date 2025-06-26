import { StyleSheet, Dimensions } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { spacing, fontSizes, borderRadius } from '../utils/sizes';

const screenWidth = Dimensions.get('window').width;

export default function useCreateStyles() {
  const { theme } = useTheme();

  return StyleSheet.create({
    container: {
      alignItems: 'center',
      padding: spacing.lg,
      backgroundColor: theme.backgroundColor,
    },
    imageGallery: { width: screenWidth, height: 260, marginBottom: spacing.sm },
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
    name: {
      fontSize: fontSizes.xl,
      fontWeight: 'bold',
      marginBottom: spacing.sm,
      color: theme.textColor,
    },
    price: {
      fontSize: fontSizes.lg,
      color: theme.primaryColor,
      fontWeight: 'bold',
      marginBottom: spacing.sm,
    },
    desc: {
      fontSize: fontSizes.md,
      color: theme.secondaryColor,
      marginBottom: spacing.sm,
      textAlign: 'center',
    },
    metaContainer: { marginTop: spacing.sm, width: '100%' },
    meta: { fontSize: fontSizes.md, color: theme.secondaryColor, marginBottom: spacing.xs },
    notFound: { fontSize: fontSizes.lg, color: 'red', marginTop: spacing.xxl },
    customizeBtn: {
      marginTop: spacing.lg,
      backgroundColor: theme.primaryColor,
      borderRadius: borderRadius.md,
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.xl,
      alignItems: 'center',
    },
    customizeBtnText: {
      color: '#fff',
      fontSize: fontSizes.lg,
      fontWeight: 'bold',
    },
    customSection: {
      width: '100%',
      marginTop: spacing.lg,
      marginBottom: spacing.sm,
      backgroundColor: theme.backgroundColor,
      borderRadius: borderRadius.md,
      padding: spacing.md,
    },

    customRow: { marginBottom: spacing.sm },
    customLabel: { fontSize: fontSizes.md, color: theme.textColor, marginBottom: spacing.xs },
    customOptionBtn: {
      paddingVertical: spacing.xs,
      paddingHorizontal: spacing.sm,
      borderRadius: borderRadius.lg,
      backgroundColor: theme.borderColor,
      marginRight: spacing.sm,
    },
    customOptionBtnActive: { backgroundColor: theme.primaryColor },
    customOptionText: { color: theme.textColor },
    customOptionTextActive: { color: '#fff', fontWeight: 'bold' },
    customHint: { color: theme.primaryColor, marginTop: spacing.sm, fontSize: fontSizes.sm },
    fabricSection: {
      width: '100%',
      marginTop: spacing.md,
      marginBottom: spacing.sm,
      backgroundColor: theme.borderColor,
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
