import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import itemsData from '../data/categoryItems.json';
import { styles } from '../styles/ItemDetailsStyles';
import CollarType from './CollarType';
import { useState } from 'react';

type ItemDetailsProps = {
  itemId?: string;
};

type ItemDetailsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ItemDetails'>;

export default function ItemDetails(props: ItemDetailsProps) {
  const navigation = useNavigation<ItemDetailsScreenNavigationProp>();
  // Support both navigation param and direct prop
  const route = useRoute<any>();
  const itemId = props.itemId || route.params?.itemId;

  const item = itemsData.find((i) => i.id === itemId);

  if (!item) {
    return (
      <View style={styles.container}>
        <Text style={styles.notFound}>Item not found.</Text>
      </View>
    );
  }

  const images: string[] = item.images && item.images.length > 0 ? item.images : [item.image];

  const [showFabric, setShowFabric] = useState(false);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isCustomizing, setIsCustomizing] = useState(false);

  const handleCustomization = () => {
    navigation.navigate('CollarStyle');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Image Gallery */}
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={styles.imageGallery}
      >
        {images.map((img, idx) => (
          <Image key={img + idx} source={{ uri: img }} style={styles.image} resizeMode='cover' />
        ))}
      </ScrollView>
      <View style={styles.imageIndicatorContainer}>
        {images.map((_, idx) => (
          <View key={idx} style={styles.imageIndicator} />
        ))}
      </View>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>${item.price}</Text>
      <Text style={styles.desc}>{item.description}</Text>
      <View style={styles.metaContainer}>
        <Text style={styles.meta}>{item.color && `Color: ${item.color}`}</Text>
        <Text style={styles.meta}>{item.pattern && `Pattern: ${item.pattern}`}</Text>
        <Text style={styles.meta}>{item.style && `Style: ${item.style}`}</Text>
      </View>
      {/* Fabric Details Section (Collapsible) */}
      <TouchableOpacity style={styles.collapseHeader} onPress={() => setShowFabric((v) => !v)}>
        <Text style={styles.collapseHeaderText}>Fabric Details</Text>
        <Text style={styles.collapseHeaderIcon}>{showFabric ? '▲' : '▼'}</Text>
      </TouchableOpacity>
      {showFabric && (
        <View style={styles.fabricSection}>
          <Text style={styles.fabricDetail}>
            {item.fabric ? item.fabric : 'fabric details not available'}
          </Text>
        </View>
      )}
      {/* Add to Cart Button */}
      <TouchableOpacity style={styles.cartBtn} onPress={handleCustomization}>
        <Text style={styles.cartBtnText}>Start Customization</Text>
      </TouchableOpacity>
      {/* Add more details here if needed */}
    </ScrollView>
  );
}
