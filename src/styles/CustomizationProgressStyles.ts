import { StyleSheet } from 'react-native';
import { spacing, fontSizes, borderRadius } from '../utils/sizes';

export const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing.sm, // Reduced from 16
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#FAF9F6',
    maxHeight: 60, // Add fixed height
  },
  contentContainer: {
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  stepItem: {
    alignItems: 'center',
    marginRight: 20, // Reduced from 24
    opacity: 0.7,
    width: 80, // Fixed width for consistent spacing
  },
  activeStep: {
    opacity: 1,
  },
  stepNumber: {
    width: 24, // Reduced from 28
    height: 24, // Reduced from 28
    borderRadius: 12,
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2, // Reduced from 4
  },
  activeStepNumber: {
    backgroundColor: '#4A3419',
  },
  stepNumberText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  stepTitle: {
    fontSize: 11, // Reduced from 12
    color: '#666',
    fontWeight: '500',
  },
  activeStepTitle: {
    color: '#4A3419',
  },
  progressBar: {
    height: spacing.xs,
    backgroundColor: '#e0e0e0',
    borderRadius: borderRadius.sm,
    marginVertical: spacing.sm,
  },
  progress: {
    height: '100%',
    backgroundColor: '#4caf50',
    borderRadius: borderRadius.sm,
  },
  text: {
    fontSize: fontSizes.sm,
    color: '#666',
    textAlign: 'center',
    marginTop: spacing.xs,
  },
});
