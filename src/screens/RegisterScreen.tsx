// src/screens/RegisterScreen.tsx
import React, { useState } from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { showAlert } from '../utils/showAlerts';
import { RegisterScreenProps } from '../types/navigation';
import createStyles from '../styles/RegisterScreenStyles';
import { apiService } from '../services/api.service';
import { API_CONFIG } from '../config/api.config';
import { CreateCustomerDTO } from 'types/customer';
import BackButton from '../components/BackButton';

function RegisterScreen({ navigation }: RegisterScreenProps) {
  const styles = createStyles();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();

  const validateForm = () => {
    if (!email || !password || !confirmPassword || !name) {
      showAlert('Error', 'Please fill in all fields');
      return false;
    }

    if (password !== confirmPassword) {
      showAlert('Error', 'Passwords do not match');
      return false;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showAlert('Error', 'Please enter a valid email address');
      return false;
    }

    // Password strength validation
    if (password.length < 6) {
      showAlert('Error', 'Password must be at least 6 characters long');
      return false;
    }

    // Name validation
    if (name.trim().length < 2) {
      showAlert('Error', 'Please enter a valid name');
      return false;
    }

    return true;
  };

  const createCustomer = async (firebaseUid: string): Promise<void> => {
    try {
      const customerData: CreateCustomerDTO = {
        firebaseUid,
        email,
        name: name.trim(),
      };

      await apiService.post(API_CONFIG.ENDPOINTS.CUSTOMERS, customerData);
    } catch (error: any) {
      console.error('Error creating customer:', error);
      throw new Error('Failed to create customer profile');
    }
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // Register the user with Firebase
      const user = await register(email, password);

      // Create customer profile in database
      await createCustomer(user.uid);

      showAlert(
        'Registration Successful',
        'Your account has been created successfully!',
        () => navigation.navigate('Login', { email: email }), // Simple onOk callback
      );
    } catch (error: any) {
      let errorMessage = 'Registration failed. Please try again.';

      // Handle specific Firebase error codes
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'This email address is already in use.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address format.';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'The password is too weak.';
      } else if (error.message) {
        // Use the error message if available
        errorMessage = error.message;
      }

      showAlert('Registration Error', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <BackButton />
        <Text style={styles.title}>Create Account</Text>

        <TextInput
          style={styles.input}
          placeholder='Full Name'
          value={name}
          onChangeText={setName}
          autoCapitalize='words'
          textContentType='name'
        />

        <TextInput
          style={styles.input}
          placeholder='Email'
          value={email}
          onChangeText={setEmail}
          autoCapitalize='none'
          keyboardType='email-address'
          autoComplete='email'
          textContentType='emailAddress'
        />

        <TextInput
          style={styles.input}
          placeholder='Password'
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize='none'
          textContentType='newPassword'
        />

        <TextInput
          style={styles.input}
          placeholder='Confirm Password'
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          autoCapitalize='none'
          textContentType='newPassword'
        />

        <TouchableOpacity
          style={[styles.button, isLoading && styles.disabledButton]}
          onPress={handleRegister}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color='#fff' />
          ) : (
            <Text style={styles.buttonText}>Register</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.linkContainer}
          disabled={isLoading}
        >
          <Text style={styles.link}>Already have an account? Sign in</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default RegisterScreen;
