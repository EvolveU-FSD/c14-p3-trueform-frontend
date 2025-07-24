import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Platform,
  StatusBar,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import { FontAwesome5 } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import createStyles from '../styles/BodyScanStyles';
import { CrossImage } from '../components/CrossImage';
import { showAlert } from '../utils/showAlerts';
import { apiService } from '../services/api.service';
import { API_CONFIG } from '../config/api.config';
import { BodyScanResponse } from '../types/bodyScanResponse';
import { BodyScanScreenNavigationProp } from '../types/navigation';

const GENDER_OPTIONS = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
];

export default function BodyScanScreen() {
  const styles = createStyles();
  const navigation = useNavigation<BodyScanScreenNavigationProp>();

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

  // Gender picker modal state
  const [isGenderModalVisible, setIsGenderModalVisible] = useState(false);
  const [tempGender, setTempGender] = useState(gender);

  // Check if running on a mobile device
  const isMobile = Platform.OS !== 'web';

  // Keyboard safe space state
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: 'Body Scan',
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

  // Gender picker handlers
  const handleGenderConfirm = () => {
    setGender(tempGender);
    setIsGenderModalVisible(false);
  };

  const handleGenderCancel = () => {
    setTempGender(gender);
    setIsGenderModalVisible(false);
  };

  const handleGenderOverlayPress = () => {
    handleGenderCancel();
  };

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
    setImage: React.Dispatch<React.SetStateAction<string | null>>,
  ) => {
    const permissionGranted =
      source === 'camera' ? await requestCameraPermission() : await requestGalleryPermission();

    if (!permissionGranted) return;

    try {
      const pickerFn =
        source === 'camera' ? ImagePicker.launchCameraAsync : ImagePicker.launchImageLibraryAsync;

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
      const result: BodyScanResponse | any = await apiService.post(
        API_CONFIG.ENDPOINTS.BODYSCAN,
        formData,
      );

      if (result?.error) {
        // Gracefully handle BodyGram rejection
        showAlert(
          'Scan Rejected',
          result.message ||
            'Your scan could not be processed. Please try again with clearer photos or different poses.',
        );
        setIsLoading(false);
        return;
      }

      setMeasurements(result.measurements);
    } catch (error: any) {
      // Check for BodyGram rejection (502 with error details)
      if (
        error?.response?.status === 502 &&
        error?.response?.data?.error === 'BodyGram API error'
      ) {
        showAlert(
          'Scan Rejected',
          'Your scan could not be processed. Please attain a clearer image or consider holding your arms farther from your body.',
        );
      } else {
        console.error('Error submitting scan:', error);
        showAlert('Error', 'Failed to submit scan. Please try again.');
      }
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

  // Render gender picker
  const renderGenderPicker = () => {
    const selectedGender = GENDER_OPTIONS.find((option) => option.value === gender);
    const displayText = selectedGender ? selectedGender.label : 'Select Gender';

    // iOS Modal Picker
    if (Platform.OS === 'ios') {
      return (
        <>
          <TouchableOpacity
            style={styles.modalTrigger}
            onPress={() => {
              setTempGender(gender);
              setIsGenderModalVisible(true);
            }}
          >
            <Text style={styles.modalTriggerText}>{displayText}</Text>
            <FontAwesome5 name='chevron-down' size={16} color='#666' />
          </TouchableOpacity>

          <Modal
            visible={isGenderModalVisible}
            animationType='slide'
            transparent={true}
            onRequestClose={handleGenderCancel}
          >
            <TouchableWithoutFeedback onPress={handleGenderOverlayPress}>
              <View style={styles.modalOverlay}>
                <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
                  <View style={styles.modalContainer}>
                    {/* Header */}
                    <View style={styles.modalHeader}>
                      <TouchableOpacity onPress={handleGenderCancel} style={styles.modalButton}>
                        <Text style={styles.modalButtonText}>Cancel</Text>
                      </TouchableOpacity>
                      <Text style={styles.modalTitle}>Select Gender</Text>
                      <TouchableOpacity onPress={handleGenderConfirm} style={styles.modalButton}>
                        <Text style={[styles.modalButtonText, styles.modalConfirmText]}>Done</Text>
                      </TouchableOpacity>
                    </View>

                    {/* Picker */}
                    <View style={styles.modalPickerContainer}>
                      <Picker
                        selectedValue={tempGender}
                        onValueChange={setTempGender}
                        style={styles.modalPicker}
                        itemStyle={styles.modalPickerItem}
                      >
                        {GENDER_OPTIONS.map((option) => (
                          <Picker.Item
                            key={option.value}
                            label={option.label}
                            value={option.value}
                          />
                        ))}
                      </Picker>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        </>
      );
    }

    // Android Dropdown Picker
    return (
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={gender}
          onValueChange={setGender}
          style={styles.picker}
          mode='dropdown'
        >
          {GENDER_OPTIONS.map((option) => (
            <Picker.Item key={option.value} label={option.label} value={option.value} />
          ))}
        </Picker>
      </View>
    );
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
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: keyboardVisible ? 200 : 50,
          }}
          keyboardShouldPersistTaps='handled'
          automaticallyAdjustKeyboardInsets={true}
        >
          <Text style={styles.title}>Body Measurements Scan</Text>

          <View style={styles.formSection}>
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
              {renderGenderPicker()}
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
                () => handleImagePick('camera', setFrontImage),
              )}

              {renderPhotoSection(
                'Profile Photo',
                profileImage,
                () => handleImagePick('gallery', setProfileImage),
                () => handleImagePick('camera', setProfileImage),
              )}
            </View>
          </View>

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit} disabled={isLoading}>
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
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
