import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import useCreateStyles from '../../styles/AddressStyles';

interface AddressFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
  autoComplete?:
    | 'name'
    | 'email'
    | 'street-address'
    | 'address-line1'
    | 'address-line2'
    | 'postal-code'
    | 'country'
    | 'tel';
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  multiline?: boolean;
  numberOfLines?: number;
  style?: any;
}

export default function AddressField({
  label,
  value,
  onChangeText,
  placeholder,
  error,
  required = false,
  autoComplete,
  keyboardType = 'default',
  multiline = false,
  numberOfLines = 1,
  style,
}: AddressFieldProps) {
  const styles = useCreateStyles();
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.fieldContainer, style]}>
      <Text style={styles.label}>
        {label}
        {required && <Text style={{ color: '#ff4444' }}> *</Text>}
      </Text>
      <TextInput
        style={[
          styles.input,
          isFocused && styles.inputFocused,
          error && styles.inputError,
          multiline && { height: numberOfLines * 20 + spacing.lg },
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        autoComplete={autoComplete}
        keyboardType={keyboardType}
        multiline={multiline}
        numberOfLines={numberOfLines}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}
