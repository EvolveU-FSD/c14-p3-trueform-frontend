import { StyleSheet } from 'react-native';
import { spacing, fontSizes, borderRadius } from '../utils/sizes';
import { useTheme } from '../theme/ThemeContext';

export default function useCreateStyles() {
  const { theme } = useTheme();

  return StyleSheet.create({
    btn: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: spacing.sm,
      alignSelf: 'flex-start',
      backgroundColor: 'transparent',
      borderRadius: borderRadius.lg,
    },
    icon: {
      fontWeight: 'bold',
      color: theme.textColor,
    },
    label: {
      marginLeft: spacing.xs,
      fontSize: fontSizes.md,
      fontWeight: '500',
      color: theme.textColor,
    },
  });
}

export type Styles = ReturnType<typeof useCreateStyles>;
