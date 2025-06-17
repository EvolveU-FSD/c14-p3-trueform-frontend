import { StyleSheet } from 'react-native';
import { spacing, fontSizes, borderRadius } from '../utils/sizes';

export const styles = StyleSheet.create({
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
  },
  label: {
    marginLeft: spacing.xs,
    fontSize: fontSizes.md,
    fontWeight: '500',
  },
});

export default styles;
