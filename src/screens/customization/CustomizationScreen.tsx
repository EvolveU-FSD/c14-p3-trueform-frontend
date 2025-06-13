import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CustomizationProvider } from '../../context/CustomizationContext';

const CUSTOMIZATION_STEPS = [
  { id: 'CollarStyle', title: 'Collar' },
  { id: 'CuffStyle', title: 'Cuff' },
  { id: 'PocketStyle', title: 'Pocket' },
  { id: 'SleeveStyle', title: 'Sleeve' },
  { id: 'ShirtLength', title: 'Length' },
  { id: 'Monogram', title: 'Monogram' },
  { id: 'Buttons', title: 'Buttons' },
  { id: 'Measurement', title: 'Measurement' }
];

export default function CustomizationScreen() {
  const navigation = useNavigation();

  return (
    <CustomizationProvider>
      <View style={styles.container}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.stepsContainer}>
          {CUSTOMIZATION_STEPS.map((step, index) => (
            <TouchableOpacity
              key={step.id}
              style={styles.stepItem}
              onPress={() => navigation.navigate(step.id as never)}
            >
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>{index + 1}</Text>
              </View>
              <Text style={styles.stepTitle}>{step.title}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <View style={styles.content}>
          <Text style={styles.startText}>Select collar style to begin customization</Text>
          <TouchableOpacity 
            style={styles.startButton}
            onPress={() => navigation.navigate('CollarStyle')}
          >
            <Text style={styles.startButtonText}>Start Customization</Text>
          </TouchableOpacity>
        </View>
      </View>
    </CustomizationProvider>
  );
}

const styles = StyleSheet.create({
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
