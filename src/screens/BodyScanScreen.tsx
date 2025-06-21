import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
  Platform,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import createStyles from '../styles/BodyScanStyles';
import { endpoints } from '../config/constants';
import { CrossImage } from '../components/CrossImage';
import { showAlert } from '../utils/showAlerts';
import { api } from '../services/api.service';
import { BodyScanResponse } from '../types/bodyScanResponse';
import { BodyScanScreenProps } from '../types/navigation';

export default function BodyScanScreen({ navigation }: BodyScanScreenProps) {
  // User information state
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [gender, setGender] = useState('male');
  const [age, setAge] = useState('');
  const styles = createStyles();
  // Image state
  const [frontImage, setFrontImage] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  // Loading state
  const [isLoading, setIsLoading] = useState(false);

  // Measurements state
  const [measurements, setMeasurements] = useState<any>(null);

  // Check if running on a mobile device
  const isMobile = Platform.OS !== 'web';

  // Function to request camera permissions
  const requestCameraPermission = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      showAlert('Permission Denied', 'We need camera permissions to take photos');
      return false;
    }
    return true;
  };

  // Function to request gallery permissions
  const requestGalleryPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      showAlert('Permission Denied', 'We need gallery permissions to select photos');
      return false;
    }
    return true;
  };

  const handleImagePick = async (
    source: 'camera' | 'gallery',
    setImage: React.Dispatch<React.SetStateAction<string | null>>
  ) => {
    const permissionGranted =
      source === 'camera'
        ? await requestCameraPermission()
        : await requestGalleryPermission();

    if (!permissionGranted) return;

    try {
      const pickerFn =
        source === 'camera'
          ? ImagePicker.launchCameraAsync
          : ImagePicker.launchImageLibraryAsync;

      const result = await pickerFn({
        allowsEditing: true,
        aspect: [9, 16],
        quality: 0.8,
        base64: true,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error picking/taking image:', error);
      showAlert('Error', 'Failed to get image. Please try again.');
    }
  };

  // Convert image URI to base64
  const imageToBase64 = async (uri: string) => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          resolve(reader.result as string);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error('Error converting image to base64:', error);
      throw error;
    }
  };

  // Handle form submission
  // In BodyScanScreen.tsx, modify handleSubmit:
  // BodyScanScreen.tsx - Updated handleSubmit
  const handleSubmit = async () => {
    if (!height || !weight || !frontImage || !profileImage) {
      showAlert('Missing Information', 'Please provide height, weight, and both photos');
      return;
    }

    try {
      setIsLoading(true);

      // Convert images to base64
      const frontImageBase64 = await imageToBase64(frontImage);
      const profileImageBase64 = await imageToBase64(profileImage);

      // Create FormData and append everything as text fields
      const formData = new FormData();
      formData.append('height', height);
      formData.append('weight', weight);
      formData.append('gender', gender);
      if (age) formData.append('age', age);

      // Append base64 strings as regular form fields
      formData.append('front_image_base64', frontImageBase64);
      formData.append('profile_image_base64', profileImageBase64);

      // Send FormData (will be multipart/form-data but with text fields only)
      const result: BodyScanResponse = await api.post(endpoints.bodyScan, formData);
      setMeasurements(result.measurements);
    } catch (error) {
      console.error('Error submitting scan:', error);
      showAlert('Error', 'Failed to submit scan. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Render photo selection section with both options on mobile
  const renderPhotoSection = (
    label: string,
    photoUri: string | null,
    galleryPickFn: () => Promise<void>,
    cameraPickFn: () => Promise<void>,
  ) => (
    <View style={styles.photoContainer}>
      <Text style={styles.photoLabel}>{label}</Text>
      {photoUri ? (
        <CrossImage source={photoUri} style={styles.previewImage} />
      ) : (
        <View style={styles.placeholderImage}>
          <Text>{label}</Text>
        </View>
      )}

      {isMobile ? (
        <View style={styles.photoButtonsRow}>
          <TouchableOpacity
            style={[styles.photoButton, styles.halfWidthButton]}
            onPress={galleryPickFn}
          >
            <Text style={styles.photoButtonText}>Gallery</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.photoButton, styles.halfWidthButton]}
            onPress={cameraPickFn}
          >
            <Text style={styles.photoButtonText}>Camera</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity style={styles.photoButton} onPress={galleryPickFn}>
          <Text style={styles.photoButtonText}>Select Photo</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  // JSX remains the same
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Body Measurements Scan</Text>

      <View style={styles.formSection}>
        {/* Rest of the JSX remains unchanged */}
        <Text style={styles.sectionTitle}>Personal Information</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Height (cm)</Text>
          <TextInput
            style={styles.input}
            value={height}
            onChangeText={setHeight}
            placeholder='Enter your height in cm'
            keyboardType='numeric'
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Weight (kg)</Text>
          <TextInput
            style={styles.input}
            value={weight}
            onChangeText={setWeight}
            placeholder='Enter your weight in kg'
            keyboardType='numeric'
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Gender</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={gender}
              onValueChange={(itemValue) => setGender(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label='Male' value='male' />
              <Picker.Item label='Female' value='female' />
            </Picker>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Age (optional)</Text>
          <TextInput
            style={styles.input}
            value={age}
            onChangeText={setAge}
            placeholder='Enter your age'
            keyboardType='numeric'
          />
        </View>
      </View>

      <View style={styles.formSection}>
        <Text style={styles.sectionTitle}>Photos</Text>
        <Text style={styles.photoInstructions}>
          Please provide two full-body photos: one front-facing and one right-side profile. Wear
          tight-fitting clothes for best results.
        </Text>

        <View style={styles.photoSection}>
          {renderPhotoSection(
            'Front Photo',
            frontImage,
            () => handleImagePick('gallery', setFrontImage),
            () => handleImagePick('camera', setFrontImage)
          )}

          {renderPhotoSection(
            'Profile Photo',
            profileImage,
            () => handleImagePick('gallery', setProfileImage),
            () => handleImagePick('camera', setProfileImage)
          )}
        </View>
      </View>

      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleSubmit}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color='#fff' />
        ) : (
          <Text style={styles.submitButtonText}>Get Measurements</Text>
        )}
      </TouchableOpacity>

      {measurements && (
        <View style={styles.resultsSection}>
          <Text style={styles.sectionTitle}>Your Measurements</Text>
          {Object.entries(measurements).map(([key, value]: [any, any]) => (
            <View key={key} style={styles.measurementRow}>
              <Text style={styles.measurementLabel}>{key}</Text>
              <Text style={styles.measurementValue}>{value}</Text>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}
