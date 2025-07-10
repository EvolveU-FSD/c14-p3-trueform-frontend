import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import useCreateStyles from '../../styles/AddressStyles';

interface CheckboxFieldProps {
  label: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
  style?: any;
}

export default function CheckboxField({ label, value, onValueChange, style }: CheckboxFieldProps) {
  const styles = useCreateStyles();

  return (
    <TouchableOpacity
      style={[styles.checkboxContainer, style]}
      onPress={() => onValueChange(!value)}
    >
      <View style={[styles.checkbox, value && styles.checkboxChecked]}>
        {value && <Text style={styles.checkmark}>✓</Text>}
      </View>
      <Text style={styles.checkboxText}>{label}</Text>
    </TouchableOpacity>
  );
}
