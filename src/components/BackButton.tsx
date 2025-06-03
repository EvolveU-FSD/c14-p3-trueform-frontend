import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import { useNavigation } from '@react-navigation/native';

type BackButtonProps = {
  style?: ViewStyle;
  color?: string;
  size?: number;
  label?: string;
};

export default function BackButton({
  style,
  color = '#000',
  size = 28,
  label,
}: BackButtonProps) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={[styles.btn, style]}
      accessibilityRole="button"
      accessibilityLabel={label || 'Back'}
    >
      <Text style={[styles.icon, { color, fontSize: size }]}>{"\u2190"}</Text>
      {label && <Text style={[styles.label, { color }]}>{label}</Text>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    alignSelf: 'flex-start',
    backgroundColor: 'transparent',
    borderRadius: 20,
  },
  icon: {
    fontWeight: 'bold',
  },
  label: {
    marginLeft: 6,
    fontSize: 18,
    fontWeight: '500',
  },
});
