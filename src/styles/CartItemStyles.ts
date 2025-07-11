import { StyleSheet, Dimensions } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { spacing, fontSizes, borderRadius } from '../utils/sizes';

const { width: screenWidth } = Dimensions.get('window');

export default function useCreateStyles() {
  const { theme } = useTheme();

  // Calculate container width for customization grid
  const containerPadding = spacing.md * 2;
  const imageWidth = spacing.xxxl + spacing.md;
  const imageMargin = spacing.md;
  const availableWidth = screenWidth - containerPadding - imageWidth - imageMargin;

  // Calculate item width for 4 items max with gaps
  const maxItems = 4;
  const totalGaps = (maxItems - 1) * spacing.xs;
  const itemWidth = (availableWidth - totalGaps) / maxItems;

  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      padding: spacing.md,
      marginBottom: spacing.sm,
      backgroundColor: theme.backgroundColor,
      borderRadius: borderRadius.md,
      borderWidth: 1,
      borderColor: theme.borderColor,
    },
    leftContainer: {
      alignItems: 'center',
      marginRight: spacing.md,
    },
    image: {
      width: spacing.xxxl + spacing.md,
      height: spacing.xxxl + spacing.md,
      borderRadius: borderRadius.md,
      marginBottom: spacing.xs,
    },
    contentContainer: {
      flex: 1,
      justifyContent: 'flex-start',
    },
    itemHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: spacing.xs,
    },
    textContainer: {
      flex: 1,
      justifyContent: 'center',
    },
    itemName: {
      fontSize: fontSizes.md,
      fontWeight: 'bold',
      color: theme.textColor,
      marginBottom: spacing.xs,
    },
    priceContainer: {
      alignItems: 'center',
      marginTop: spacing.xs,
    },
    basePriceText: {
      fontSize: fontSizes.xs,
      color: theme.secondaryColor,
      marginBottom: spacing.xs / 2,
    },
    totalPriceText: {
      fontSize: fontSizes.md,
      fontWeight: 'bold',
      color: theme.primaryColor,
    },
    deleteButton: {
      marginTop: spacing.xs,
      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.sm,
      backgroundColor: '#ff4444',
      borderRadius: borderRadius.sm,
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: 40,
      minHeight: 40,
    },
    deleteButtonText: {
      color: '#ffffff',
      fontSize: fontSizes.sm,
      fontWeight: '600',
    },
    customizationGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginTop: spacing.xs,
      gap: spacing.xs,
      maxWidth: availableWidth,
    },
    customizationImageContainer: {
      width: Math.floor(itemWidth),
      height: Math.floor(itemWidth),
      borderRadius: borderRadius.sm,
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: theme.borderColor,
    },
    customizationImage: {
      width: '100%',
      height: '100%',
    },
  });
}

export type Styles = ReturnType<typeof useCreateStyles>;
