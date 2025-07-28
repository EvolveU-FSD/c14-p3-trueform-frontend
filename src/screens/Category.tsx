// Category.tsx
import React, { useState, useEffect } from 'react';
import {
  StatusBar,
  View,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';
import type { RouteProp, NavigationProp } from '@react-navigation/native';
import createStyles from '../styles/CategoryStyles';
import { CategoryService } from '../services/category.service';
import { Category as CategoryType } from '../types/category';
import { getImageUrl } from '../utils/imageHandling';
import { RootStackParamList } from '../types/navigation';
import { useTheme } from '../theme/ThemeContext';

export default function CategoryScreen() {
  const theme = useTheme();
  const styles = createStyles();

  const route = useRoute<RouteProp<RootStackParamList, 'Category'>>();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { slug: categorySlug } = route.params || { slug: 'all' };

  // States
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<CategoryType[]>([]);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError(null);
        const fetchedCategories = await CategoryService.getAll();
        setCategories(fetchedCategories);
      } catch (err) {
        console.error('Failed to fetch categories:', err);
        setError('Failed to load categories');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [categorySlug]);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: 'TruForm Tailors',
      headerShadowVisible: true,
    });
  }, [navigation]);

  if (loading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size='large' color={theme.primaryColor} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={[]}>
      <StatusBar barStyle='dark-content' />

      {/* Categories Grid */}
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.gridContainer}
        columnWrapperStyle={styles.columnWrapper}
        renderItem={({ item }) => {
          // Use mediaUrl first, then fallback to imageUrl
          const imageSource = item.mediaUrl || item.imageUrl;

          return (
            <TouchableOpacity
              style={styles.categoryCard}
              onPress={() => {
                navigation.navigate('Items', { categoryId: item.id });
              }}
              activeOpacity={0.8}
            >
              {imageSource && (
                <Image
                  source={{ uri: getImageUrl(imageSource) }}
                  style={styles.categoryImage}
                  resizeMode='cover'
                />
              )}
              <View style={styles.categoryContent}>
                <Text style={styles.categoryName} numberOfLines={2}>
                  {item.name}
                </Text>
                {/* TODO- Change the value passed to Items to be the ClothingType instead of the
                name directly. This may need to be adjusted in the backend as well in order to pass
                the clothingType field again. */}
                {/* <Text style={styles.categoryType}>{item.clothingType}</Text> */}
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
}
