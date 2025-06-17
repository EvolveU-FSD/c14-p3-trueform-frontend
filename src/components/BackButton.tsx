import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../styles/BackButtonStyles';

type BackButtonProps = {
  style?: ViewStyle;
  color?: string;
  size?: number;
  label?: string;
};

export default function BackButton({ style, color = '#000', size = 28, label }: BackButtonProps) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={[styles.btn, style]}
      accessibilityRole='button'
      accessibilityLabel={label || 'Back'}
    >
      <Text style={[styles.icon, { color, fontSize: size }]}>{'\u2190'}</Text>
      {label && <Text style={[styles.label, { color }]}>{label}</Text>}
    </TouchableOpacity>
  );
}
