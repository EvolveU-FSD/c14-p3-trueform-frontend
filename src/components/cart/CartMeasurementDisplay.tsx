import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Text, View, Modal, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import createStyles from '../../styles/CartMeasurementDisplayStyles';
import { useAuth } from '../../context/AuthContext';
import { Measurement } from '../../types/measurement.types';
import { FontAwesome5 } from '@expo/vector-icons';

interface CartMeasurementDisplayProps {
  measurements: Measurement[];
  onMeasurementSelect?: (measurement: Measurement | undefined) => void;
}

export default function CartMeasurementDisplay({
  measurements,
  onMeasurementSelect,
}: CartMeasurementDisplayProps) {
  const styles = createStyles();
  const navigation = useNavigation();
  const { isAuthenticated } = useAuth();
  const [selectedMeasurementId, setSelectedMeasurementId] = useState<string | undefined>(
    measurements.length > 0 ? measurements[0].id : undefined,
  );
  const [isPickerVisible, setIsPickerVisible] = useState(false);

  useEffect(() => {
    if (measurements.length > 0 && !selectedMeasurementId) {
      setSelectedMeasurementId(measurements[0].id);
    }
  }, [measurements]);

  const handlePress = () => {
    (navigation as any).navigate('BodyScan');
  };

  const handleLogin = () => {
    (navigation as any).navigate('Login');
  };

  const selectedMeasurement = measurements.find((m) => m.id === selectedMeasurementId);

  useEffect(() => {
    if (onMeasurementSelect) {
      onMeasurementSelect(selectedMeasurement);
    }
    // Only call when selection changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedMeasurement]);

  // iOS Modal Picker
  const renderIOSPicker = () => (
    <>
      <TouchableOpacity style={styles.button} onPress={() => setIsPickerVisible(true)}>
        <Text style={styles.buttonText}>
          {selectedMeasurement
            ? `${selectedMeasurement.standardType} (${selectedMeasurement.unit})`
            : 'Select Measurement'}
        </Text>
        <FontAwesome5 name='chevron-down' size={16} color='#fff' style={{ marginLeft: 8 }} />
      </TouchableOpacity>
      <Modal
        visible={isPickerVisible}
        animationType='slide'
        transparent={true}
        onRequestClose={() => setIsPickerVisible(false)}
      >
        <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.3)' }}>
          <View
            style={{
              backgroundColor: '#fff',
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
              padding: 16,
            }}
          >
            <TouchableOpacity
              onPress={() => setIsPickerVisible(false)}
              style={{ alignSelf: 'flex-end', marginBottom: 8 }}
            >
              <Text style={{ color: '#007AFF', fontWeight: 'bold', fontSize: 16 }}>Done</Text>
            </TouchableOpacity>
            <Picker
              selectedValue={selectedMeasurementId}
              onValueChange={(itemValue) => setSelectedMeasurementId(itemValue)}
            >
              {measurements.map((m) => (
                <Picker.Item key={m.id} label={`${m.standardType} (${m.unit})`} value={m.id} />
              ))}
            </Picker>
          </View>
        </View>
      </Modal>
    </>
  );

  // Android Dropdown Picker
  const renderAndroidPicker = () => (
    <View style={[styles.button, { paddingHorizontal: 0, paddingVertical: 0 }]}>
      <Picker
        selectedValue={selectedMeasurementId}
        onValueChange={(itemValue) => setSelectedMeasurementId(itemValue)}
        style={{ color: '#fff', width: '100%' }}
        dropdownIconColor='#fff'
      >
        {measurements.map((m) => (
          <Picker.Item key={m.id} label={`${m.standardType} (${m.unit})`} value={m.id} />
        ))}
      </Picker>
    </View>
  );

  return (
    <View style={styles.container}>
      {isAuthenticated ? (
        measurements.length > 0 ? (
          <>{Platform.OS === 'ios' ? renderIOSPicker() : renderAndroidPicker()}</>
        ) : (
          <TouchableOpacity style={styles.button} onPress={handlePress}>
            <Text style={styles.buttonText}>Add Measurements</Text>
          </TouchableOpacity>
        )
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login to Add Measurements</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
