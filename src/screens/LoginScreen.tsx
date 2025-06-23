import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { showAlert } from 'utils/showAlerts';
import { LoginScreenProps } from '../types/navigation';
import { useTheme } from '../theme/ThemeContext';
import { createStyles } from '../styles/LoginScreenStyles';

function LoginScreen({ navigation, route }: LoginScreenProps) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  // Use email from params if available
  const [email, setEmail] = useState(route.params?.email || '');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  // Ref for password input with correct type
  const passwordInputRef = useRef<TextInput>(null);

  // Optional: Focus on password field if email is pre-filled
  useEffect(() => {
    if (route.params?.email && passwordInputRef.current) {
      passwordInputRef.current.focus();
    }
  }, [route.params?.email]);

  const handleLogin = async () => {
    if (!email || !password) {
      showAlert('Error', 'Please enter both email and password');
      return;
    }

    setIsLoading(true);
    try {
      await login(email, password);

      navigation.navigate('Home');
    } catch (error: any) {
      showAlert('Login Failed', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder='Email'
        value={email}
        onChangeText={setEmail}
        autoCapitalize='none'
        keyboardType='email-address'
      />

      <TextInput
        ref={passwordInputRef}
        style={styles.input}
        placeholder='Password'
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoFocus={false} // We'll handle focus via ref
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={isLoading}>
        <Text style={styles.buttonText}>{isLoading ? 'Logging in...' : 'Login'}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Register')}
        style={styles.linkContainer}
      >
        <Text style={styles.link}>Don't have an account? Register</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
