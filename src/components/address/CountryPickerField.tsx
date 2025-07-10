import React from 'react';
import { View, Text, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import useCreateStyles from '../../styles/AddressStyles';

interface CountryPickerFieldProps {
  label: string;
  value: string;
  onValueChange: (value: string) => void;
  error?: string;
  required?: boolean;
  style?: any;
}

const COUNTRIES = [
  { label: 'Select Country', value: '' },
  { label: 'United States', value: 'US' },
  { label: 'Canada', value: 'CA' },
  { label: 'United Kingdom', value: 'GB' },
  { label: 'Australia', value: 'AU' },
  { label: 'Germany', value: 'DE' },
  { label: 'France', value: 'FR' },
  { label: 'Italy', value: 'IT' },
  { label: 'Spain', value: 'ES' },
  { label: 'Netherlands', value: 'NL' },
  { label: 'Belgium', value: 'BE' },
  { label: 'Switzerland', value: 'CH' },
  { label: 'Austria', value: 'AT' },
  { label: 'Sweden', value: 'SE' },
  { label: 'Norway', value: 'NO' },
  { label: 'Denmark', value: 'DK' },
  { label: 'Finland', value: 'FI' },
  { label: 'Japan', value: 'JP' },
  { label: 'South Korea', value: 'KR' },
  { label: 'China', value: 'CN' },
  { label: 'India', value: 'IN' },
  { label: 'Brazil', value: 'BR' },
  { label: 'Mexico', value: 'MX' },
];

export default function CountryPickerField({
  label,
  value,
  onValueChange,
  error,
  required = false,
  style,
}: CountryPickerFieldProps) {
  const styles = useCreateStyles();

  return (
    <View style={[styles.fieldContainer, style]}>
      <Text style={styles.label}>
        {label}
        {required && <Text style={{ color: '#ff4444' }}> *</Text>}
      </Text>
      <View style={[styles.pickerContainer, error && styles.inputError]}>
        <Picker
          selectedValue={value}
          onValueChange={onValueChange}
          style={styles.picker}
          mode={Platform.OS === 'android' ? 'dropdown' : undefined}
          itemStyle={
            Platform.OS === 'ios'
              ? {
                  fontSize: 16,
                  height: 120,
                  textAlign: 'center',
                }
              : undefined
          }
        >
          {COUNTRIES.map((country) => (
            <Picker.Item key={country.value} label={country.label} value={country.value} />
          ))}
        </Picker>
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}
