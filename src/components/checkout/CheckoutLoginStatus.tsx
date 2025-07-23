import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import createStyles from '../../styles/LoginStatusStyles';
import { LoginScreenNavigationProp } from '../../types/navigation';
import { CustomerService } from '../../services/customer.service';

export default function LoginStatus() {
  const styles = createStyles();
  const { isAuthenticated, user } = useAuth();
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const [customerName, setCustomerName] = useState<string>('');

  useEffect(() => {
    const fetchCustomerName = async () => {
      if (isAuthenticated && user) {
        try {
          const customer = await CustomerService.getByFirebaseUid(user.uid);
          if (customer) {
            setCustomerName(customer.name);
          } else if (user.displayName) {
            setCustomerName(user.displayName);
          } else {
            setCustomerName('');
          }
        } catch (error) {
          console.error('Failed to fetch customer by Firebase UID:', error);
          // Optionally, show a fallback name or error message
          if (user.displayName) {
            setCustomerName(user.displayName);
          } else {
            setCustomerName('');
          }
        }
      } else {
        setCustomerName('');
      }
    };
    fetchCustomerName();
  }, [isAuthenticated, user]);

  const handleLoginPress = () => {
    navigation.navigate('Login');
  };

  if (isAuthenticated && user) {
    // Show welcome message for logged in users
    return (
      <View style={styles.container}>
        <View style={styles.welcomeContainer}>
          <FontAwesome5 name='user-circle' size={24} color='#4CAF50' />
          <View style={styles.textContainer}>
            <Text style={styles.welcomeText}>
              Hello, {customerName || user.displayName || user.email}!
            </Text>
            <Text style={styles.subtitleText}>Ready to complete your order</Text>
          </View>
          <FontAwesome5 name='check-circle' size={20} color='#4CAF50' />
        </View>
      </View>
    );
  }

  // Show login prompt for non-authenticated users
  return (
    <View style={styles.container}>
      <View style={styles.loginPromptContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.promptTitle}>Sign in for faster checkout</Text>
          <Text style={styles.promptSubtitle}>Save your information and track your orders</Text>
        </View>
        <TouchableOpacity style={styles.loginButton} onPress={handleLoginPress}>
          <Text style={styles.loginButtonText}>Sign In</Text>
          <FontAwesome5 name='arrow-right' size={16} color='#fff' />
        </TouchableOpacity>
      </View>
      <View style={styles.guestContainer}>
        <Text style={styles.guestText}>or continue as guest</Text>
      </View>
    </View>
  );
}
