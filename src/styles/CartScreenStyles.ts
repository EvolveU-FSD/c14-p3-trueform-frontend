import { StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { fontSizes, spacing } from '../utils/sizes';

export default function useCreateStyles() {
  const { theme } = useTheme();

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.backgroundColor,
      padding: spacing.md,
    },
    title: {
      fontSize: fontSizes.xl,
      fontWeight: 'bold',
      color: theme.textColor,
      marginBottom: spacing.md,
    },
    subtitle: {
      fontSize: fontSizes.md,
      color: theme.secondaryColor,
      textAlign: 'center',
      marginTop: spacing.xl,
    },
    itemsList: {
      paddingBottom: spacing.lg,
    },
  });
}

export type Styles = ReturnType<typeof useCreateStyles>;
