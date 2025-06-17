import { StyleSheet } from 'react-native';
import { spacing, fontSizes, borderRadius } from '../utils/sizes';

export function createStyles() {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      padding: spacing.sm,
      justifyContent: 'space-between',
    },
    option: {
      width: '48%',
      marginBottom: spacing.md,
      padding: spacing.sm,
      borderRadius: borderRadius.md,
      backgroundColor: '#f5f5f5',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#ddd',
    },
    selectedOption: {
      backgroundColor: '#e8f5e9',
      borderColor: '#4caf50',
    },
    optionImage: {
      width: '100%',
      height: 120,
      resizeMode: 'contain',
      marginBottom: spacing.sm,
    },
    optionTitle: {
      fontSize: fontSizes.sm,
      fontWeight: '600',
      textAlign: 'center',
    },
    optionDescription: {
      fontSize: fontSizes.xs,
      color: '#666',
      textAlign: 'center',
      marginTop: spacing.xs,
    },
  });
}
