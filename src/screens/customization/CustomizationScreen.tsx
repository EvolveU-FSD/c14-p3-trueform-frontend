import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { CustomizationProvider } from '../../context/CustomizationContext';
import { createStyles } from '../../styles/CustomizationScreenStyles';

const CUSTOMIZATION_STEPS = [
  { id: 'CollarStyle', title: 'Collar' },
  { id: 'CuffStyle', title: 'Cuff' },
  { id: 'PocketStyle', title: 'Pocket' },
  { id: 'SleeveStyle', title: 'Sleeve' },
  { id: 'ShirtLength', title: 'Length' },
  { id: 'Monogram', title: 'Monogram' },
  { id: 'Buttons', title: 'Buttons' },
  { id: 'Measurement', title: 'Measurement' },
];

export default function CustomizationScreen({ navigation }: any) {
  const styles = createStyles();
  // Note: This component needs proper typing with navigation props

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
