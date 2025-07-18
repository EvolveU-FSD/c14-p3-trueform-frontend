import { StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { spacing, fontSizes, borderRadius } from '../utils/sizes';

export default function useCreateStyles() {
  const { theme } = useTheme();

  return StyleSheet.create({
    banner: {
      height: 200,
      marginHorizontal: spacing.md,
      marginVertical: spacing.md,
      justifyContent: 'center',
      paddingLeft: spacing.lg,
      backgroundColor: theme.backgroundColor,
    },
    bannerImage: {
      borderRadius: borderRadius.lg,
    },
    title: {
      fontSize: fontSizes.xxl,
      fontWeight: 'bold',
      color: theme.textColor,
      width: '60%',
      textShadowColor: 'rgba(0, 0, 0, 0.3)',
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 3,
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      borderRadius: borderRadius.lg,
    },
  });
}

export type Styles = ReturnType<typeof useCreateStyles>;
