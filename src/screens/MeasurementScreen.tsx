import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MeasureTabNavigationProp } from '../types/navigation';
import createStyles from '../styles/MeasurementScreenStyles';

export default function MeasurementScreen() {
  const styles = createStyles();
  const navigation = useNavigation<MeasureTabNavigationProp>();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: 'Measurements',
      headerShadowVisible: true,
    });
  }, [navigation]);

  const handleBodyScanPress = () => {
    // Navigate to the root navigator to access BodyScan screen
    (navigation as any).navigate('BodyScan');
  };

  const handleManualMeasurementPress = () => {
    // Navigate to the root navigator to access ManualMeasurementInput screen
    (navigation as any).navigate('ManualMeasurementInput');
  };

  return (
    <SafeAreaView style={styles.container} edges={[]}>
      <StatusBar barStyle='dark-content' />
      <View style={styles.content}>
        <View style={styles.headerSection}>
          <Text style={styles.title}>Choose Your Measurement Method</Text>
          <Text style={styles.subtitle}>
            Select the method that works best for you to get accurate measurements
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.primaryButton} onPress={handleBodyScanPress}>
            <Text style={styles.primaryButtonText}>📏 Body Scan</Text>
            <Text style={styles.primaryButtonDescription}>
              Take photos to get AI-powered measurements
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryButton} onPress={handleManualMeasurementPress}>
            <Text style={styles.secondaryButtonText}>📐 Manual Input</Text>
            <Text style={styles.secondaryButtonDescription}>Enter your measurements manually</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
