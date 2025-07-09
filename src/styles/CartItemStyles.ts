import { StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { spacing, fontSizes, borderRadius } from '../utils/sizes';

export default function useCreateStyles() {
  const { theme } = useTheme();

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
    image: {
      width: spacing.xxxl + spacing.md,
      height: spacing.xxxl + spacing.md,
      borderRadius: borderRadius.md,
      marginRight: spacing.md,
    },
    textContainer: {
      flex: 1,
      justifyContent: 'center',
    },
    itemName: {
      fontSize: fontSizes.md,
      fontWeight: 'bold',
      color: theme.textColor,
    },
  });
}

export type Styles = ReturnType<typeof useCreateStyles>;
