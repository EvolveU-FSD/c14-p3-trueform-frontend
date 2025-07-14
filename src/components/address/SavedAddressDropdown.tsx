import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import useCreateStyles from '../../styles/SavedAddressDropdownStyles';
import { Address, SavedAddressDropdownProps } from '../../types/address.types';

export default function SavedAddressDropdown({
  label,
  addresses,
  selectedAddressId,
  onAddressSelect,
  placeholder = 'Select a saved address',
  error,
  required = false,
  style,
}: SavedAddressDropdownProps) {
  const styles = useCreateStyles();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const selectedAddress = addresses.find((address) => address.id === selectedAddressId);
  const displayText = selectedAddress ? selectedAddress.address1 : placeholder;

  const handleAddressSelect = (address: Address) => {
    onAddressSelect(address);
    setIsModalVisible(false);
  };

  const handleClearSelection = () => {
    onAddressSelect(null);
    setIsModalVisible(false);
  };

  const handleOverlayPress = () => {
    setIsModalVisible(false);
  };

  const formatAddressSubText = (address: Address) => {
    const parts = [address.city, address.state, address.zipCode].filter(Boolean);
    return parts.join(', ');
  };

  return (
    <View style={[styles.fieldContainer, style]}>
      <Text style={styles.label}>
        {label}
        {required && <Text style={styles.requiredIndicator}> *</Text>}
      </Text>

      <TouchableOpacity
        style={[styles.modalTrigger, error && styles.inputError]}
        onPress={() => setIsModalVisible(true)}
      >
        <Text style={[styles.modalTriggerText, !selectedAddress && styles.placeholderText]}>
          {displayText}
        </Text>
        <FontAwesome5 name='chevron-down' size={16} color='#666' />
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        animationType='slide'
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={handleOverlayPress}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
              <View style={styles.modalContainer}>
                {/* Header */}
                <View style={styles.modalHeader}>
                  <TouchableOpacity
                    onPress={() => setIsModalVisible(false)}
                    style={styles.modalButton}
                  >
                    <Text style={styles.modalButtonText}>Cancel</Text>
                  </TouchableOpacity>
                  <Text style={styles.modalTitle}>Select Address</Text>
                  <TouchableOpacity onPress={handleClearSelection} style={styles.modalButton}>
                    <Text style={[styles.modalButtonText, styles.modalConfirmText]}>Clear</Text>
                  </TouchableOpacity>
                </View>

                {/* Address List */}
                <ScrollView style={styles.addressListContainer}>
                  {addresses.length === 0 ? (
                    <Text style={styles.noAddressesText}>No saved addresses found</Text>
                  ) : (
                    addresses.map((address) => (
                      <TouchableOpacity
                        key={address.id}
                        style={[
                          styles.addressItem,
                          selectedAddressId === address.id && styles.selectedAddressItem,
                        ]}
                        onPress={() => handleAddressSelect(address)}
                      >
                        <Text style={styles.addressText}>{address.address1}</Text>
                        <Text style={styles.addressSubText}>{formatAddressSubText(address)}</Text>
                        {address.firstName && address.lastName && (
                          <Text style={styles.addressSubText}>
                            {address.firstName} {address.lastName}
                          </Text>
                        )}
                      </TouchableOpacity>
                    ))
                  )}
                </ScrollView>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}
