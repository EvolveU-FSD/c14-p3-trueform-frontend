import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import useCreateStyles from '../../styles/AddressStyles';
import { AddressFieldProps } from '../../types/address.types';

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
  disabled = false,
}: AddressFieldProps) {
  const styles = useCreateStyles();
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.fieldContainer, style]}>
      <Text style={[styles.label, disabled && styles.disabledText]}>
        {label}
        {required && <Text style={styles.requiredIndicator}> *</Text>}
      </Text>
      <TextInput
        style={[
          styles.input,
          isFocused && styles.inputFocused,
          error && styles.inputError,
          multiline && styles.inputMultiline,
          disabled && styles.disabledInput,
        ]}
        value={value}
        // TODO: Find a better way to handle the empty function below.
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onChangeText={disabled ? () => {} : onChangeText}
        placeholder={placeholder}
        autoComplete={autoComplete}
        keyboardType={keyboardType}
        multiline={multiline}
        numberOfLines={numberOfLines}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        editable={!disabled}
        selectTextOnFocus={!disabled}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}
