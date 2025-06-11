import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, Alert, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { bodyScanStyles } from '../styles/BodyScanStyles';
import { endpoints } from '../config/constants';
import { CrossImage } from '../components/CrossImage';
import { showAlert } from '../utils/showAlerts';
import { api } from '../services/api.service';
import { BodyScanResponse } from '../types/bodyScanResponse';

export default function BodyScanScreen() {
  // User information state
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [gender, setGender] = useState('male');
  const [age, setAge] = useState('');

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

  // Image picker function for front view from gallery
  const pickFrontImageFromGallery = async () => {
    if (!(await requestGalleryPermission())) return;

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [9, 16],
        quality: 0.8,
        base64: true, // Request base64 data
      });

      if (!result.canceled) {
        setFrontImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      showAlert('Error', 'Failed to pick image. Please try again.');
    }
  };

  // Image picker function for profile view from gallery
  const pickProfileImageFromGallery = async () => {
    if (!(await requestGalleryPermission())) return;

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [9, 16],
        quality: 0.8,
        base64: true, // Request base64 data
      });

      if (!result.canceled) {
        setProfileImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      showAlert('Error', 'Failed to pick image. Please try again.');
    }
  };

  // Take front photo with camera
  const takeFrontPhotoWithCamera = async () => {
    if (!(await requestCameraPermission())) return;

    try {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [9, 16],
        quality: 0.8,
        base64: true, // Request base64 data
      });

      if (!result.canceled) {
        setFrontImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error taking photo:', error);
      showAlert('Error', 'Failed to take photo. Please try again.');
    }
  };

  // Take profile photo with camera
  const takeProfilePhotoWithCamera = async () => {
    if (!(await requestCameraPermission())) return;

    try {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [9, 16],
        quality: 0.8,
        base64: true, // Request base64 data
      });

      if (!result.canceled) {
        setProfileImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error taking photo:', error);
      showAlert('Error', 'Failed to take photo. Please try again.');
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
    cameraPickFn: () => Promise<void>
  ) => (
    <View style={bodyScanStyles.photoContainer}>
      <Text style={bodyScanStyles.photoLabel}>{label}</Text>
      {photoUri ? (
        <CrossImage source={photoUri} style={bodyScanStyles.previewImage} />
      ) : (
        <View style={bodyScanStyles.placeholderImage}>
          <Text>{label}</Text>
        </View>
      )}

      {isMobile ? (
        <View style={bodyScanStyles.photoButtonsRow}>
          <TouchableOpacity
            style={[bodyScanStyles.photoButton, bodyScanStyles.halfWidthButton]}
            onPress={galleryPickFn}
          >
            <Text style={bodyScanStyles.photoButtonText}>Gallery</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[bodyScanStyles.photoButton, bodyScanStyles.halfWidthButton]}
            onPress={cameraPickFn}
          >
            <Text style={bodyScanStyles.photoButtonText}>Camera</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity style={bodyScanStyles.photoButton} onPress={galleryPickFn}>
          <Text style={bodyScanStyles.photoButtonText}>Select Photo</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  // JSX remains the same
  return (
    <ScrollView style={bodyScanStyles.container}>
      <Text style={bodyScanStyles.title}>Body Measurements Scan</Text>

      <View style={bodyScanStyles.formSection}>
        {/* Rest of the JSX remains unchanged */}
        <Text style={bodyScanStyles.sectionTitle}>Personal Information</Text>

        <View style={bodyScanStyles.inputContainer}>
          <Text style={bodyScanStyles.label}>Height (cm)</Text>
          <TextInput
            style={bodyScanStyles.input}
            value={height}
            onChangeText={setHeight}
            placeholder="Enter your height in cm"
            keyboardType="numeric"
          />
        </View>

        <View style={bodyScanStyles.inputContainer}>
          <Text style={bodyScanStyles.label}>Weight (kg)</Text>
          <TextInput
            style={bodyScanStyles.input}
            value={weight}
            onChangeText={setWeight}
            placeholder="Enter your weight in kg"
            keyboardType="numeric"
          />
        </View>

        <View style={bodyScanStyles.inputContainer}>
          <Text style={bodyScanStyles.label}>Gender</Text>
          <View style={bodyScanStyles.pickerContainer}>
            <Picker
              selectedValue={gender}
              onValueChange={(itemValue) => setGender(itemValue)}
              style={bodyScanStyles.picker}
            >
              <Picker.Item label="Male" value="male" />
              <Picker.Item label="Female" value="female" />
            </Picker>
          </View>
        </View>

        <View style={bodyScanStyles.inputContainer}>
          <Text style={bodyScanStyles.label}>Age (optional)</Text>
          <TextInput
            style={bodyScanStyles.input}
            value={age}
            onChangeText={setAge}
            placeholder="Enter your age"
            keyboardType="numeric"
          />
        </View>
      </View>

      <View style={bodyScanStyles.formSection}>
        <Text style={bodyScanStyles.sectionTitle}>Photos</Text>
        <Text style={bodyScanStyles.photoInstructions}>
          Please provide two full-body photos: one front-facing and one right-side profile.
          Wear tight-fitting clothes for best results.
        </Text>

        <View style={bodyScanStyles.photoSection}>
          {renderPhotoSection(
            "Front Photo",
            frontImage,
            pickFrontImageFromGallery,
            takeFrontPhotoWithCamera
          )}

          {renderPhotoSection(
            "Profile Photo",
            profileImage,
            pickProfileImageFromGallery,
            takeProfilePhotoWithCamera
          )}
        </View>
      </View>

      <TouchableOpacity
        style={bodyScanStyles.submitButton}
        onPress={handleSubmit}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={bodyScanStyles.submitButtonText}>Get Measurements</Text>
        )}
      </TouchableOpacity>

      {measurements && (
        <View style={bodyScanStyles.resultsSection}>
          <Text style={bodyScanStyles.sectionTitle}>Your Measurements</Text>
          {Object.entries(measurements).map(([key, value]: [any, any]) => (
            <View key={key} style={bodyScanStyles.measurementRow}>
              <Text style={bodyScanStyles.measurementLabel}>{key}</Text>
              <Text style={bodyScanStyles.measurementValue}>{value}</Text>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}