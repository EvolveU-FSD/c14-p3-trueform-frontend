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
    scrollContent: {
      paddingHorizontal: spacing.md,
      paddingBottom: spacing.sm,
    },
  });
}
