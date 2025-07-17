import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Platform,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { FontAwesome5 } from '@expo/vector-icons';
import useCreateStyles from '../../styles/AddressStyles';
import { CountryPickerFieldProps, CountryOption } from '../../types/address.types';

const COUNTRIES: CountryOption[] = [
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
  disabled = false,
}: CountryPickerFieldProps) {
  const styles = useCreateStyles();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [tempValue, setTempValue] = useState(value);

  // Set default to US if no value is provided
  const currentValue = value || 'US';
  const selectedCountry = COUNTRIES.find((country) => country.value === currentValue);
  const displayText = selectedCountry ? selectedCountry.label : 'United States';

  // Set default on mount if no value exists
  useEffect(() => {
    if (!value && !disabled) {
      onValueChange('US');
    }
  }, []);

  const handleConfirm = () => {
    if (!disabled) {
      onValueChange(tempValue);
      setIsModalVisible(false);
    }
  };

  const handleCancel = () => {
    setTempValue(currentValue);
    setIsModalVisible(false);
  };

  const handleOverlayPress = () => {
    handleCancel();
  };

  // iOS Modal Picker
  if (Platform.OS === 'ios') {
    return (
      <View style={[styles.fieldContainer, style, disabled && styles.disabledContainer]}>
        <Text style={[styles.label, disabled && styles.disabledText]}>
          {label}
          {required && <Text style={styles.requiredIndicator}> *</Text>}
        </Text>

        <TouchableOpacity
          style={[
            styles.modalTrigger,
            error && styles.inputError,
            disabled && styles.disabledPickerContainer,
          ]}
          onPress={() => {
            if (!disabled) {
              setTempValue(currentValue);
              setIsModalVisible(true);
            }
          }}
          disabled={disabled}
        >
          <Text style={[styles.modalTriggerText, disabled && styles.disabledText]}>
            {displayText}
          </Text>
          <FontAwesome5
            name='chevron-down'
            size={16}
            color={disabled ? styles.disabledText?.color || '#999' : '#666'}
          />
        </TouchableOpacity>

        <Modal
          visible={isModalVisible && !disabled}
          animationType='slide'
          transparent={true}
          onRequestClose={handleCancel}
        >
          <TouchableWithoutFeedback onPress={handleOverlayPress}>
            <View style={styles.modalOverlay}>
              <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
                <View style={styles.modalContainer}>
                  {/* Header */}
                  <View style={styles.modalHeader}>
                    <TouchableOpacity onPress={handleCancel} style={styles.modalButton}>
                      <Text style={styles.modalButtonText}>Cancel</Text>
                    </TouchableOpacity>
                    <Text style={styles.modalTitle}>Select Country</Text>
                    <TouchableOpacity onPress={handleConfirm} style={styles.modalButton}>
                      <Text style={[styles.modalButtonText, styles.modalConfirmText]}>Done</Text>
                    </TouchableOpacity>
                  </View>

                  {/* Picker */}
                  <View style={styles.modalPickerContainer}>
                    <Picker
                      selectedValue={tempValue}
                      onValueChange={setTempValue}
                      style={styles.modalPicker}
                      itemStyle={styles.modalPickerItem}
                    >
                      {COUNTRIES.map((country) => (
                        <Picker.Item
                          key={country.value}
                          label={country.label}
                          value={country.value}
                        />
                      ))}
                    </Picker>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>
    );
  }

  // Android Dropdown Picker
  return (
    <View style={[styles.fieldContainer, style, disabled && styles.disabledContainer]}>
      <Text style={[styles.label, disabled && styles.disabledText]}>
        {label}
        {required && <Text style={styles.requiredIndicator}> *</Text>}
      </Text>
      <View
        style={[
          styles.pickerContainer,
          error && styles.inputError,
          disabled && styles.disabledPickerContainer,
        ]}
      >
        <Picker
          selectedValue={currentValue}
          // TODO: Find a better way to handle the empty function below.
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          onValueChange={disabled ? () => {} : onValueChange}
          style={styles.picker}
          mode='dropdown'
          enabled={!disabled}
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
