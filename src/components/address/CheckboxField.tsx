import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import useCreateStyles from '../../styles/AddressStyles';
import { CheckboxFieldProps } from '../../types/address.types';

export default function CheckboxField({ label, value, onValueChange, style }: CheckboxFieldProps) {
  const styles = useCreateStyles();

  return (
    <TouchableOpacity
      style={[styles.checkboxContainer, style]}
      onPress={() => onValueChange(!value)}
      activeOpacity={0.7}
    >
      <View style={[styles.checkbox, value && styles.checkboxChecked]}>
        {value && <Text style={styles.checkmark}>✓</Text>}
      </View>
      <Text style={styles.checkboxText}>{label}</Text>
    </TouchableOpacity>
  );
}
