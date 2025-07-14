import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import useManualMeasurementInputStyles from '../styles/ManualMeasurementInput';
import { useTheme } from '../theme/ThemeContext';

// Placeholder image for video
// eslint-disable-next-line @typescript-eslint/no-var-requires
const videoPlaceholder = require('../../assets/images/measurementImage.jpeg');

const measurementFields = [
  { key: 'neck', label: 'Neck' },
  { key: 'chest', label: 'Chest' },
  { key: 'stomach', label: 'Stomach' },
  { key: 'hip', label: 'Hip' },
  { key: 'length', label: 'Length' },
  { key: 'shoulder', label: 'Shoulder' },
  { key: 'sleeve', label: 'Sleeve' },
];

export default function ManualMeasurementInput() {
  const styles = useManualMeasurementInputStyles();
  const { theme } = useTheme();
  const navigation = useNavigation();
  const [unit, setUnit] = useState<'inch' | 'cm'>('inch');
  const [fit, setFit] = useState<'standard' | 'slim'>('standard');
  const [measurements, setMeasurements] = useState<Record<string, string>>({});

  const handleInputChange = (key: string, value: string) => {
    setMeasurements((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Video/Image Placeholder */}
        <View style={styles.imageContainer}>
          <Image source={videoPlaceholder} style={styles.image} resizeMode='cover' />
        </View>

        {/* Bullet + Unit Toggle */}
        <View style={styles.bulletRow}>
          <Text style={styles.bulletIcon}>{'▶'}</Text>
          <Text style={styles.unitLabel}>Enter Your Measurement :</Text>
        </View>
        <View style={styles.unitToggleRow}>
          <TouchableOpacity
            style={[
              styles.unitButton,
              { backgroundColor: unit === 'inch' ? theme.primaryColor : theme.borderColor },
            ]}
            onPress={() => setUnit('inch')}
          >
            <Text style={{ color: unit === 'inch' ? '#fff' : theme.textColor, fontWeight: 'bold' }}>
              Inch
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.unitButton,
              { backgroundColor: unit === 'cm' ? theme.primaryColor : theme.borderColor },
              { marginRight: 0 },
            ]}
            onPress={() => setUnit('cm')}
          >
            <Text style={{ color: unit === 'cm' ? '#fff' : theme.textColor, fontWeight: 'bold' }}>
              cm
            </Text>
          </TouchableOpacity>
        </View>

        {/* Bullet + Fit Selection */}
        <View style={styles.bulletRow}>
          <Text style={styles.bulletIcon}>{'▶'}</Text>
          <Text style={styles.fitLabel}>Select Your Fit :</Text>
        </View>
        <View style={styles.fitToggleRow}>
          <TouchableOpacity
            style={[
              styles.fitButton,
              { backgroundColor: fit === 'standard' ? theme.primaryColor : theme.borderColor },
            ]}
            onPress={() => setFit('standard')}
          >
            <Text
              style={{ color: fit === 'standard' ? '#fff' : theme.textColor, fontWeight: 'bold' }}
            >
              Signature Standard Fit
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.fitButton,
              { backgroundColor: fit === 'slim' ? theme.primaryColor : theme.borderColor },
              { marginRight: 0 },
            ]}
            onPress={() => setFit('slim')}
          >
            <Text style={{ color: fit === 'slim' ? '#fff' : theme.textColor, fontWeight: 'bold' }}>
              Euro Slim Fit
            </Text>
          </TouchableOpacity>
        </View>

        {/* Measurement Inputs in two-column, 4-row grid with label on top, input, then unit */}
        <View style={styles.measurementSection}>
          <Text style={styles.sectionTitle}>SHIRT</Text>
          <View style={styles.measurementGrid}>
            {Array.from({ length: 4 }).map((_, rowIdx) => (
              <View key={rowIdx} style={styles.measurementRow}>
                {[0, 1].map((colIdx) => {
                  const fieldIdx = rowIdx * 2 + colIdx;
                  const field = measurementFields[fieldIdx];
                  if (!field) {
                    // If odd number, add empty box for alignment
                    return <View key={colIdx} style={[styles.measurementBox, { opacity: 0 }]} />;
                  }
                  return (
                    <View key={field.key} style={styles.measurementBox}>
                      <Text style={styles.measurementLabel}>{field.label}</Text>
                      <TextInput
                        style={styles.measurementInput}
                        keyboardType='numeric'
                        value={measurements[field.key] || ''}
                        onChangeText={(text) => handleInputChange(field.key, text)}
                        placeholder=''
                        placeholderTextColor={theme.secondaryColor}
                      />
                      <Text style={styles.measurementUnit}>
                        {unit.charAt(0).toUpperCase() + unit.slice(1)}
                      </Text>
                    </View>
                  );
                })}
              </View>
            ))}
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={styles.buttonText}>BACK TO DESIGN</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.addToCartButton}
            onPress={() => {
              /* Add to cart logic here */
            }}
            onPress={() => {
              /* Add to cart logic here */
            }}
          >
            <Text style={styles.buttonText}>ADD TO CART</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
