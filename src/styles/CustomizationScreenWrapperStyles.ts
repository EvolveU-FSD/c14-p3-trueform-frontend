import { StyleSheet } from 'react-native';
import { spacing } from '../utils/sizes';
import { useTheme } from '../theme/ThemeContext';

export default function useCreateStyles() {
  const { theme } = useTheme();

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.backgroundColor,
    },
    scrollContainer: {
      flex: 1,
      paddingVertical: spacing.md,
    },
  });
}

export type Styles = ReturnType<typeof useCreateStyles>;
