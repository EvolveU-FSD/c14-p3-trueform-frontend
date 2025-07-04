import { StyleSheet } from 'react-native';
import { spacing, fontSizes } from '../utils/sizes';
import { useTheme } from '../theme/ThemeContext';

export default function useCreateStyles() {
  const { theme } = useTheme();

  return StyleSheet.create({
    container: {
      marginVertical: spacing.md,
      backgroundColor: theme.backgroundColor,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: spacing.md,
      marginBottom: spacing.md,
    },
    title: {
      fontSize: fontSizes.xl,
      fontWeight: 'bold',
      color: theme.textColor,
    },
    seeAll: {
      fontSize: fontSizes.sm,
      color: theme.secondaryColor,
    },
    categoriesContainer: {
      paddingHorizontal: spacing.md,
    },
    categoryItem: {
      alignItems: 'center',
      marginRight: spacing.md,
      width: 80,
    },
    imageContainer: {
      width: 80,
      height: 80,
      backgroundColor: theme.borderColor,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: spacing.sm,
      overflow: 'hidden',
    },
    categoryImage: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
    },
    categoryName: {
      fontSize: fontSizes.sm,
      textAlign: 'center',
      color: theme.textColor,
    },
  });
}

export type Styles = ReturnType<typeof useCreateStyles>;
