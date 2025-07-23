import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FontAwesome5 } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { RootStackParamList } from '../types/navigation';
import createStyles from '../styles/AccountScreenStyles';
import { CustomerService } from 'services/customer.service';

type AccountScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Account'>;

export default function AccountScreen() {
  const styles = createStyles();
  const navigation = useNavigation<AccountScreenNavigationProp>();
  const { isAuthenticated, user, logout } = useAuth();
  const [customerName, setCustomerName] = useState<string>('');

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: 'Account',
      headerShadowVisible: true,
    });
  }, [navigation]);

  useEffect(() => {
    async function fetchCustomerName() {
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
          if (user.displayName) {
            setCustomerName(user.displayName);
          } else {
            setCustomerName('');
          }
        }
      } else {
        setCustomerName('');
      }
    }
    fetchCustomerName();
  }, [isAuthenticated, user]);

  const handleLogout = async () => {
    try {
      await logout();
      navigation.navigate('Main');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  const handleRegister = () => {
    navigation.navigate('Register');
  };

  if (!isAuthenticated) {
    return (
      <SafeAreaView style={styles.container} edges={[]}>
        <StatusBar barStyle='dark-content' />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            <View style={styles.welcomeSection}>
              <FontAwesome5 name='user-circle' size={80} color='#ccc' />
              <Text style={styles.welcomeTitle}>Welcome to TruForm</Text>
              <Text style={styles.welcomeSubtitle}>
                Sign in to access your account and track your orders
              </Text>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.primaryButton} onPress={handleLogin}>
                <Text style={styles.primaryButtonText}>Sign In</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.secondaryButton} onPress={handleRegister}>
                <Text style={styles.secondaryButtonText}>Create Account</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.guestSection}>
              <Text style={styles.guestText}>or continue browsing as guest</Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={[]}>
      <StatusBar barStyle='dark-content' />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* User Profile Section */}
          <View style={styles.profileSection}>
            <View style={styles.avatarContainer}>
              <FontAwesome5 name='user-circle' size={80} color='#4CAF50' />
            </View>
            <Text style={styles.userName}>{customerName || user?.displayName || user?.email}</Text>
            <Text style={styles.userEmail}>{user?.email}</Text>
          </View>

          {/* Menu Options */}
          <View style={styles.menuSection}>
            <TouchableOpacity style={styles.menuItem}>
              <FontAwesome5 name='box' size={20} color='#666' />
              <Text style={styles.menuItemText}>Order History</Text>
              <FontAwesome5 name='chevron-right' size={16} color='#ccc' />
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>
              <FontAwesome5 name='user-edit' size={20} color='#666' />
              <Text style={styles.menuItemText}>Edit Profile</Text>
              <FontAwesome5 name='chevron-right' size={16} color='#ccc' />
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>
              <FontAwesome5 name='map-marker-alt' size={20} color='#666' />
              <Text style={styles.menuItemText}>Addresses</Text>
              <FontAwesome5 name='chevron-right' size={16} color='#ccc' />
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>
              <FontAwesome5 name='credit-card' size={20} color='#666' />
              <Text style={styles.menuItemText}>Payment Methods</Text>
              <FontAwesome5 name='chevron-right' size={16} color='#ccc' />
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>
              <FontAwesome5 name='bell' size={20} color='#666' />
              <Text style={styles.menuItemText}>Notifications</Text>
              <FontAwesome5 name='chevron-right' size={16} color='#ccc' />
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>
              <FontAwesome5 name='question-circle' size={20} color='#666' />
              <Text style={styles.menuItemText}>Help & Support</Text>
              <FontAwesome5 name='chevron-right' size={16} color='#ccc' />
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>
              <FontAwesome5 name='cog' size={20} color='#666' />
              <Text style={styles.menuItemText}>Settings</Text>
              <FontAwesome5 name='chevron-right' size={16} color='#ccc' />
            </TouchableOpacity>
          </View>

          {/* Logout Button */}
          <View style={styles.logoutSection}>
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <FontAwesome5 name='sign-out-alt' size={20} color='#ff4757' />
              <Text style={styles.logoutButtonText}>Sign Out</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
