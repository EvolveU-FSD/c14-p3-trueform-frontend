import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import createStyles from '../../styles/CartMeasurementDisplayStyles';

export default function CartMeasurementDisplay() {
  const styles = createStyles();
  const navigation = useNavigation();

  const handlePress = () => {
    (navigation as any).navigate('BodyScan');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>Add Measurements</Text>
      </TouchableOpacity>
    </View>
  );
}