import { StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { spacing, fontSizes, borderRadius } from '../utils/sizes';

export default function useCreateStyles() {
  const { theme } = useTheme();
  return StyleSheet.create({
    container: {
      marginHorizontal: spacing.md,
      marginVertical: spacing.sm,
      alignItems: 'center',
    },
    button: {
      backgroundColor: theme.primaryColor,
      paddingVertical: spacing.lg,
      paddingHorizontal: spacing.xl,
      borderRadius: borderRadius.md,
      alignItems: 'center',
      width: '100%',
    },
    buttonText: {
      color: '#fff',
      fontSize: fontSizes.lg,
      fontWeight: 'bold',
    },
  });
}

export type Styles = ReturnType<typeof useCreateStyles>;
