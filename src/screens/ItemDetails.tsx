import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import createStyles from '../styles/ItemDetailsStyles';
import { ClothingService } from '../services/clothing.service';
import { Clothing } from '../types/clothing';
import { useTheme } from '../theme/ThemeContext';
import { getImageUrl } from '../utils/imageHandling';

type ItemDetailsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ItemDetails'>;

const screenWidth = Dimensions.get('window').width;

export default function ItemDetails() {
  const navigation = useNavigation<ItemDetailsScreenNavigationProp>();
  const route = useRoute<any>();
  const styles = createStyles();
  const { theme } = useTheme();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [item, setItem] = useState<Clothing | null>(null);
  const [showFabric, setShowFabric] = useState(false);
  // TODO: Allow for multiple images on the ItemDetails page.
  // const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Get itemId from route params
  const itemId = route.params?.itemId;

  useEffect(() => {
    const fetchItemDetails = async () => {
      if (!itemId) {
        setError('No item ID provided');
        setLoading(false);
        return;
      }

      try {
        const clothingItem = await ClothingService.getById(itemId);
        if (clothingItem) {
          setItem(clothingItem);
        } else {
          setError('Item not found');
        }
      } catch (err) {
        console.error('Failed to fetch item details:', err);
        setError('Failed to load item details');
      } finally {
        setLoading(false);
      }
    };

    fetchItemDetails();
  }, [itemId]);

  const handleCustomization = () => {
    if (item) {
      navigation.navigate('Customization', {
        itemId: item.id,
      });
    }
  };

  const handleScroll = (event: any) => {
    console.log(`temporarily empty function around ${event}`);
    // const contentOffset = event.nativeEvent.contentOffset.x;
    // TODO: Implement once multiple images are allowed for each item.
    // const newIndex = Math.round(contentOffset / screenWidth);
    // setCurrentImageIndex(newIndex);
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size='large' color={theme.primaryColor} />
      </View>
    );
  }

  if (error || !item) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text style={styles.notFound}>{error || 'Item not found'}</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Image Gallery */}
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={styles.imageGallery}
        onMomentumScrollEnd={handleScroll}
      >
        <Image
          source={{ uri: getImageUrl(item.mediaUrl) }}
          style={[styles.image, { width: screenWidth }]}
          resizeMode='cover'
        />
      </ScrollView>

      {/* Item Details */}
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>${item.price}</Text>
      <Text style={styles.desc}>{item.description}</Text>

      <View style={styles.metaContainer}>
        {item.colors && <Text style={styles.meta}>Colors: {item.colors.join(', ')}</Text>}
      </View>

      {/* Fabric Details Section */}
      <TouchableOpacity style={styles.collapseHeader} onPress={() => setShowFabric(!showFabric)}>
        <Text style={styles.collapseHeaderText}>Fabric Details</Text>
        <Text style={styles.collapseHeaderIcon}>{showFabric ? '▲' : '▼'}</Text>
      </TouchableOpacity>

      {showFabric && (
        <View style={styles.fabricSection}>
          <Text style={styles.fabricDetail}>
            {item.description || 'Fabric details not available'}
          </Text>
        </View>
      )}

      {/* Start Customization Button */}
      <TouchableOpacity style={styles.customizeBtn} onPress={handleCustomization}>
        <Text style={styles.customizeBtnText}>Start Customization</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
