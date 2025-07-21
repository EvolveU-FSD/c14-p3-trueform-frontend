import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import useManualMeasurementInputStyles from '../styles/ManualMeasurementInput';
import { useTheme } from '../theme/ThemeContext';
import { ManualMeasurementInputNavigationProp } from '../types/navigation';
import { MeasurementService } from '../services/measurement.service';
import {
  CreateMeasurementDTO,
  MeasurementUnit,
  MeasurementValues,
} from '../types/measurement.types';
import { showAlert } from 'utils/showAlerts';

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
  const navigation = useNavigation<ManualMeasurementInputNavigationProp>();
  const [unit, setUnit] = useState<'inch' | 'cm'>('inch');
  const [fit, setFit] = useState<'standard' | 'slim'>('standard');
  const [measurements, setMeasurements] = useState<Record<string, string>>({});
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const inputRefs = useRef<Array<TextInput | null>>([]);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: 'Manual Measurements',
      headerShadowVisible: true,
      headerBackTitle: 'Measurements',
      headerBackTitleVisible: true,
    });

    // Keyboard listeners for padding adjustment
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, [navigation]);

  const handleInputChange = (key: string, value: string) => {
    setMeasurements((prev) => ({ ...prev, [key]: value }));
  };

  const handleAddMeasurement = async () => {
    try {
      // Convert measurements to numbers and create MeasurementValues object
      const measurementValues: MeasurementValues = {};
      Object.entries(measurements).forEach(([key, value]) => {
        if (value && value.trim() !== '') {
          const num = parseFloat(value);
          if (!Number.isFinite(num)) return; // Skip invalid numbers
          measurementValues[key] = num;
        }
      });

      // Create measurement data
      const measurementData: CreateMeasurementDTO = {
        customerId: 'current-user-id', // Replace with actual customer ID from auth context
        standardType: fit === 'standard' ? 'US' : 'EU',
        unit: unit === 'inch' ? MeasurementUnit.INCHES : MeasurementUnit.CENTIMETERS,
        values: measurementValues,
      };

      const result = await MeasurementService.create(measurementData);

      if (result) {
        showAlert('Success', 'Measurements saved successfully!');
        navigation.goBack();
      } else {
        showAlert('Error', 'Failed to save measurements. Please try again.');
      }
    } catch (error) {
      console.error('Error saving measurements:', error);
      showAlert('Error', 'Failed to save measurements. Please try again.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
    >
      <SafeAreaView style={styles.container} edges={[]}>
        <StatusBar barStyle='dark-content' />
        <ScrollView
          contentContainerStyle={{
            ...styles.scrollContent,
            paddingBottom: keyboardVisible ? 200 : 50,
          }}
          keyboardShouldPersistTaps='handled'
          showsVerticalScrollIndicator={false}
          automaticallyAdjustKeyboardInsets={true}
        >
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
              <Text
                style={{ color: unit === 'inch' ? '#fff' : theme.textColor, fontWeight: 'bold' }}
              >
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
              <Text
                style={{ color: fit === 'slim' ? '#fff' : theme.textColor, fontWeight: 'bold' }}
              >
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
                      return <View key={colIdx} style={[styles.measurementBox, { opacity: 0 }]} />;
                    }
                    const isLast =
                      fieldIdx === measurementFields.length - 1 || !measurementFields[fieldIdx + 1];
                    return (
                      <View key={field.key} style={styles.measurementBox}>
                        <Text style={styles.measurementLabel}>{field.label}</Text>
                        <TextInput
                          ref={(ref) => (inputRefs.current[fieldIdx] = ref)}
                          style={styles.measurementInput}
                          keyboardType='numeric'
                          value={measurements[field.key] || ''}
                          onChangeText={(text) => handleInputChange(field.key, text)}
                          placeholder=''
                          placeholderTextColor={theme.secondaryColor}
                          returnKeyType={isLast ? 'done' : 'next'}
                          onSubmitEditing={() => {
                            if (!isLast && inputRefs.current[fieldIdx + 1]) {
                              inputRefs.current[fieldIdx + 1]?.focus();
                            } else {
                              Keyboard.dismiss();
                            }
                          }}
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
              <Text style={styles.buttonText}>BACK TO DESIGN</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.addToCartButton} onPress={handleAddMeasurement}>
              <Text style={styles.buttonText}>SAVE MEASUREMENTS</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
