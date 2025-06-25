import { StyleSheet } from 'react-native';
import { spacing, fontSizes, borderRadius } from '../utils/sizes';
import { useTheme } from '../theme/ThemeContext';

export default function useCreateStyles() {
  const { theme } = useTheme();

  return StyleSheet.create({
    container: {
      width: 150,
      marginRight: 15,
      backgroundColor: theme.backgroundColor,
    },
    image: {
      width: '100%',
      height: 180,
      borderRadius: borderRadius.md,
      backgroundColor: theme.borderColor,
    },
    detailsContainer: {
      marginTop: spacing.sm,
    },
    category: {
      fontSize: fontSizes.sm,
      color: theme.secondaryColor,
      marginBottom: spacing.xs,
    },
    name: {
      fontSize: fontSizes.md,
      fontWeight: 'bold',
      marginBottom: spacing.xs,
      color: theme.textColor,
    },
    price: {
      fontSize: fontSizes.md,
      fontWeight: '600',
      color: theme.primaryColor,
    },
  });
}

export type Styles = ReturnType<typeof useCreateStyles>;
