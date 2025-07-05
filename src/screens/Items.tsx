import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import type { RouteProp, NavigationProp } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import createStyles from '../styles/ItemStyle';
import { ClothingService } from '../services/clothing.service';
import { Clothing } from '../types/clothing';
import { getImageUrl } from '../utils/imageHandling';
import { RootStackParamList } from '../types/navigation';
import { useTheme } from '../theme/ThemeContext';

const FILTER_OPTIONS = {
  colors: [
    { label: 'White', value: 'white' },
    { label: 'Navy', value: 'navy' },
    { label: 'Beige', value: 'beige' },
    { label: 'Red', value: 'red' },
    { label: 'Blue', value: 'blue' },
  ],
  patterns: [
    { label: 'Solid', value: 'solid' },
    { label: 'Check', value: 'check' },
    { label: 'Stripe', value: 'stripe' },
    { label: 'Printed', value: 'printed' },
  ],
};

export default function Items() {
  const theme = useTheme();
  const styles = createStyles();

  const route = useRoute<RouteProp<RootStackParamList, 'Items'>>();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { slug: categoryId } = route.params;

  // States
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [clothingItems, setClothingItems] = useState<Clothing[]>([]);
  const [showSort, setShowSort] = useState(false);
  const [selectedSort, setSelectedSort] = useState('newest');
  const [showFilter, setShowFilter] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [collapsedSections, setCollapsedSections] = useState({
    colors: true,
    patterns: true,
  });

  // Fetch clothing items
  useEffect(() => {
    const fetchClothingItems = async () => {
      try {
        setLoading(true);
        setError(null);
        const items = await ClothingService.getAll();
        setClothingItems(items);
      } catch (err) {
        console.error('Failed to fetch clothing items:', err);
        setError('Failed to load items');
      } finally {
        setLoading(false);
      }
    };

    fetchClothingItems();
  }, [categoryId]);

  // Sort function
  const sortItems = (items: Clothing[], sortBy: string): Clothing[] => {
    const sortedItems = [...items];

    switch (sortBy) {
      case 'newest':
        // Sort by updatedAt date, most recent first
        return sortedItems.sort((a, b) => {
          const dateA = new Date(a.updatedAt || 0);
          const dateB = new Date(b.updatedAt || 0);
          return dateB.getTime() - dateA.getTime();
        });
      case 'price_low':
        return sortedItems.sort((a, b) => a.price - b.price);
      case 'price_high':
        return sortedItems.sort((a, b) => b.price - a.price);
      default:
        return sortedItems;
    }
  };

  // TODO: Fix the filters on the next ticket.
  // Filter function
  const filterItems = (items: Clothing[], filters: string[]): Clothing[] => {
    if (filters.length === 0) return items;

    return items.filter((item) => {
      // Check if item matches any of the selected filters
      const matchesColor = filters.some((filter) =>
        item.colors.some((color) => color.toLowerCase() === filter.toLowerCase()),
      );

      // For patterns, you'd need to add a pattern field to your Clothing type
      // For now, we'll just check colors
      return matchesColor;
    });
  };

  // Get sorted and filtered items
  const getSortedAndFilteredItems = (): Clothing[] => {
    const filteredItems = filterItems(clothingItems, selectedFilters);
    return sortItems(filteredItems, selectedSort);
  };

  const displayItems = getSortedAndFilteredItems();

  // Handle sort change
  const handleSortChange = (sortValue: string) => {
    setSelectedSort(sortValue);
    setShowSort(false);
  };

  const handleBackPress = () => {
    navigation.navigate('Home');
  };

  const toggleSection = (section: 'colors' | 'patterns') => {
    setCollapsedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerLeft: () => (
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <FontAwesome5 name='chevron-left' size={20} color='#333' />
        </TouchableOpacity>
      ),
      headerTitle: '',
      headerShadowVisible: false,
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
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle='dark-content' />

      {/* Header with Sort and Filter */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton} onPress={() => setShowSort(!showSort)}>
          <Text style={styles.headerButtonText}>
            Sort By: {SORT_OPTIONS.find((opt) => opt.value === selectedSort)?.label}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.headerButton} onPress={() => setShowFilter(!showFilter)}>
          <FontAwesome5 name='sliders-h' size={20} color='#333' />
        </TouchableOpacity>
      </View>

      {/* Items Count */}
      <Text style={styles.itemCount}>
        {displayItems.length} {displayItems.length === 1 ? 'item' : 'items'} found
      </Text>

      {/* Sort Options Dropdown */}
      {showSort && (
        <View style={styles.sortDropdown}>
          {SORT_OPTIONS.map((option) => (
            <TouchableOpacity
              key={option.value}
              style={[
                styles.sortOption,
                selectedSort === option.value && styles.sortOptionSelected,
              ]}
              onPress={() => handleSortChange(option.value)}
            >
              <Text style={styles.sortOptionText}>{option.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Filter Dropdown */}
      {showFilter && (
        <View style={styles.filterDropdown}>
          {/* Colors Section */}
          <TouchableOpacity style={styles.filterHeader} onPress={() => toggleSection('colors')}>
            <Text style={styles.filterTitle}>Fabric Color</Text>
            <FontAwesome5
              name={collapsedSections.colors ? 'plus' : 'minus'}
              size={16}
              color='#333'
            />
          </TouchableOpacity>
          {!collapsedSections.colors && (
            <View style={styles.filterOptions}>
              {FILTER_OPTIONS.colors.map((color) => (
                <TouchableOpacity
                  key={`color-${color.value}`}
                  style={[
                    styles.filterOption,
                    selectedFilters.includes(color.value) && styles.filterOptionSelected,
                  ]}
                  onPress={() => {
                    setSelectedFilters((prev) =>
                      prev.includes(color.value)
                        ? prev.filter((v) => v !== color.value)
                        : [...prev, color.value],
                    );
                  }}
                >
                  <Text style={styles.filterOptionText}>{color.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Patterns Section */}
          <TouchableOpacity
            style={[styles.filterHeader, { marginTop: 16 }]}
            onPress={() => toggleSection('patterns')}
          >
            <Text style={styles.filterTitle}>Pattern</Text>
            <FontAwesome5
              name={collapsedSections.patterns ? 'plus' : 'minus'}
              size={16}
              color='#333'
            />
          </TouchableOpacity>
          {!collapsedSections.patterns && (
            <View style={styles.filterOptions}>
              {FILTER_OPTIONS.patterns.map((pattern) => (
                <TouchableOpacity
                  key={`pattern-${pattern.value}`}
                  style={[
                    styles.filterOption,
                    selectedFilters.includes(pattern.value) && styles.filterOptionSelected,
                  ]}
                  onPress={() => {
                    setSelectedFilters((prev) =>
                      prev.includes(pattern.value)
                        ? prev.filter((v) => v !== pattern.value)
                        : [...prev, pattern.value],
                    );
                  }}
                >
                  <Text style={styles.filterOptionText}>{pattern.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      )}

      {/* Items Grid */}
      <FlatList
        data={displayItems}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.gridContainer}
        columnWrapperStyle={styles.columnWrapper}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.itemCard}
            onPress={() => navigation.navigate('ItemDetails', { itemId: item.id })}
            activeOpacity={0.8}
          >
            <Image
              source={{ uri: getImageUrl(item.mediaUrl) }}
              style={styles.itemImage}
              resizeMode='cover'
            />
            <View style={styles.itemContent}>
              <Text style={styles.itemName} numberOfLines={1}>
                {item.name}
              </Text>
              <Text style={styles.itemPrice}>${item.price}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const SORT_OPTIONS = [
  { label: 'Newest', value: 'newest' },
  { label: 'Price: Low to High', value: 'price_low' },
  { label: 'Price: High to Low', value: 'price_high' },
];
