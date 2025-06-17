import { StyleSheet } from 'react-native';

export function createStyles() {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FAF9F6',
    },
    stepsContainer: {
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: '#eee',
    },
    stepItem: {
      alignItems: 'center',
      marginRight: 24,
      opacity: 0.7,
    },
    stepNumber: {
      width: 28,
      height: 28,
      borderRadius: 14,
      backgroundColor: '#4A3419',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 4,
    },
    stepNumberText: {
      color: '#fff',
      fontSize: 14,
      fontWeight: '600',
    },
    stepTitle: {
      fontSize: 12,
      color: '#4A3419',
      fontWeight: '500',
    },
    content: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    startText: {
      fontSize: 16,
      color: '#666',
      marginBottom: 20,
      textAlign: 'center',
    },
    startButton: {
      backgroundColor: '#4A3419',
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 8,
    },
    startButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '600',
    },
  });
}
