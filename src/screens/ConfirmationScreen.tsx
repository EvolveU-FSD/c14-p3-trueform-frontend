import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../types/navigation';
import createStyles from '../styles/ConfirmationScreenStyles';

type ConfirmationScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Confirmation'
>;

export default function ConfirmationScreen() {
  const styles = createStyles();
  const navigation = useNavigation<ConfirmationScreenNavigationProp>();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: 'Order Confirmed',
      headerShadowVisible: true,
      headerBackTitleVisible: false,
      headerLeft: () => null, // Remove back button
    });
  }, [navigation]);

  const handleBackToShop = () => {
    navigation.navigate('Main', { screen: 'Shop' });
  };

  return (
    <SafeAreaView style={styles.container} edges={[]}>
      <StatusBar barStyle='dark-content' />
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Ionicons name='checkmark-circle' size={80} color='#4CAF50' />
        </View>

        <Text style={styles.title}>Order Confirmed!</Text>
        <Text style={styles.subtitle}>Thank you for your purchase</Text>

        <Text style={styles.description}>
          Your order has been successfully processed. You will receive a confirmation email shortly
          with your order details and tracking information.
        </Text>

        <TouchableOpacity style={styles.shopButton} onPress={handleBackToShop}>
          <Text style={styles.shopButtonText}>Continue Shopping</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
