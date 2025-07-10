import React, { useState } from 'react';
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

interface StatePickerFieldProps {
  label: string;
  value: string;
  onValueChange: (value: string) => void;
  error?: string;
  required?: boolean;
  style?: any;
}

const US_STATES = [
  { label: 'Select State', value: '' },
  { label: 'Alabama', value: 'AL' },
  { label: 'Alaska', value: 'AK' },
  { label: 'Arizona', value: 'AZ' },
  { label: 'Arkansas', value: 'AR' },
  { label: 'California', value: 'CA' },
  { label: 'Colorado', value: 'CO' },
  { label: 'Connecticut', value: 'CT' },
  { label: 'Delaware', value: 'DE' },
  { label: 'Florida', value: 'FL' },
  { label: 'Georgia', value: 'GA' },
  { label: 'Hawaii', value: 'HI' },
  { label: 'Idaho', value: 'ID' },
  { label: 'Illinois', value: 'IL' },
  { label: 'Indiana', value: 'IN' },
  { label: 'Iowa', value: 'IA' },
  { label: 'Kansas', value: 'KS' },
  { label: 'Kentucky', value: 'KY' },
  { label: 'Louisiana', value: 'LA' },
  { label: 'Maine', value: 'ME' },
  { label: 'Maryland', value: 'MD' },
  { label: 'Massachusetts', value: 'MA' },
  { label: 'Michigan', value: 'MI' },
  { label: 'Minnesota', value: 'MN' },
  { label: 'Mississippi', value: 'MS' },
  { label: 'Missouri', value: 'MO' },
  { label: 'Montana', value: 'MT' },
  { label: 'Nebraska', value: 'NE' },
  { label: 'Nevada', value: 'NV' },
  { label: 'New Hampshire', value: 'NH' },
  { label: 'New Jersey', value: 'NJ' },
  { label: 'New Mexico', value: 'NM' },
  { label: 'New York', value: 'NY' },
  { label: 'North Carolina', value: 'NC' },
  { label: 'North Dakota', value: 'ND' },
  { label: 'Ohio', value: 'OH' },
  { label: 'Oklahoma', value: 'OK' },
  { label: 'Oregon', value: 'OR' },
  { label: 'Pennsylvania', value: 'PA' },
  { label: 'Rhode Island', value: 'RI' },
  { label: 'South Carolina', value: 'SC' },
  { label: 'South Dakota', value: 'SD' },
  { label: 'Tennessee', value: 'TN' },
  { label: 'Texas', value: 'TX' },
  { label: 'Utah', value: 'UT' },
  { label: 'Vermont', value: 'VT' },
  { label: 'Virginia', value: 'VA' },
  { label: 'Washington', value: 'WA' },
  { label: 'West Virginia', value: 'WV' },
  { label: 'Wisconsin', value: 'WI' },
  { label: 'Wyoming', value: 'WY' },
];

export default function StatePickerField({
  label,
  value,
  onValueChange,
  error,
  required = false,
  style,
}: StatePickerFieldProps) {
  const styles = useCreateStyles();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [tempValue, setTempValue] = useState(value);

  const selectedState = US_STATES.find((state) => state.value === value);
  const displayText = selectedState ? selectedState.label : 'Select State';

  const handleConfirm = () => {
    onValueChange(tempValue);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setTempValue(value);
    setIsModalVisible(false);
  };

  const handleOverlayPress = () => {
    handleCancel();
  };

  // iOS Modal Picker
  if (Platform.OS === 'ios') {
    return (
      <View style={[styles.fieldContainer, style]}>
        <Text style={styles.label}>
          {label}
          {required && <Text style={styles.requiredIndicator}> *</Text>}
        </Text>

        <TouchableOpacity
          style={[styles.modalTrigger, error && styles.inputError]}
          onPress={() => {
            setTempValue(value);
            setIsModalVisible(true);
          }}
        >
          <Text style={[styles.modalTriggerText, !value && styles.placeholderText]}>
            {displayText}
          </Text>
          <FontAwesome5 name='chevron-down' size={16} color='#666' />
        </TouchableOpacity>

        <Modal
          visible={isModalVisible}
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
                    <Text style={styles.modalTitle}>Select State</Text>
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
                      {US_STATES.map((state) => (
                        <Picker.Item key={state.value} label={state.label} value={state.value} />
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
    <View style={[styles.fieldContainer, style]}>
      <Text style={styles.label}>
        {label}
        {required && <Text style={styles.requiredIndicator}> *</Text>}
      </Text>
      <View style={[styles.pickerContainer, error && styles.inputError]}>
        <Picker
          selectedValue={value}
          onValueChange={onValueChange}
          style={styles.picker}
          mode='dropdown'
        >
          {US_STATES.map((state) => (
            <Picker.Item key={state.value} label={state.label} value={state.value} />
          ))}
        </Picker>
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}
