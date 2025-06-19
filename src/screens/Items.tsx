import React, { useState, useMemo, useEffect } from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import itemsData from '../data/categoryItems.json';
import { createStyles } from '../styles/ItemStyle';
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

const imageMapping: { [key: string]: any } = {
  'assets/images/shirtImages/White solid shirt.jpeg': require('../../assets/images/shirtImages/White solid shirt.jpeg'),
   'assets/images/shirtImages/Black solid shirt.jpeg': require('../../assets/images/shirtImages/Black solid shirt.jpeg'),
   'assets/images/shirtImages/Yellow solid shirt.jpeg': require('../../assets/images/shirtImages/Yellow solid shirt.jpeg'),
    'assets/images/shirtImages/Red solid shirt.jpeg': require('../../assets/images/shirtImages/Red solid shirt.jpeg'),
   'assets/images/shirtImages/Blue solid shirt.jpeg': require('../../assets/images/shirtImages/Blue solid shirt.jpeg'),
   'assets/images/shirtImages/Navy solid shirt.jpeg': require('../../assets/images/shirtImages/Navy solid shirt.jpeg'),
   'assets/images/shirtImages/White stripes shirt.jpeg': require('../../assets/images/shirtImages/White stripes shirt.jpeg'),
  'assets/images/shirtImages/Red stripes shirt.jpeg': require('../../assets/images/shirtImages/Red stripes shirt.jpeg'),
  'assets/images/shirtImages/Navy stripes shirt.jpeg': require('../../assets/images/shirtImages/Navy stripes shirt.jpeg'),
  'assets/images/shirtImages/Blue stripes shirt.jpeg': require('../../assets/images/shirtImages/Blue stripes shirt.jpeg'),
  
  
  
};

export default function Items() {
  const navigation = useNavigation();
  const route = useRoute<any>();
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const { slug: categoryId } = route.params;

  // States
  const [showSort, setShowSort] = useState(false);
  const [selectedSort, setSelectedSort] = useState('recommended');
  const [showFilter, setShowFilter] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [collapsedSections, setCollapsedSections] = useState({
    colors: true,
    patterns: true,
  });

  // Filter items for this category
  const categoryItems = useMemo(
    
    () => {console.log('itemsData', itemsData); 
      return itemsData.filter((item) => item.categoryId === categoryId)},
    [categoryId],
  );

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

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle='dark-content' />

      {/* Header with Sort and Filter */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton} onPress={() => setShowSort(!showSort)}>
          <Text style={styles.headerButtonText}>Sort By: {selectedSort}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.headerButton} onPress={() => setShowFilter(!showFilter)}>
          <FontAwesome5 name='sliders-h' size={20} color='#333' />
        </TouchableOpacity>
      </View>

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
              onPress={() => {
                setSelectedSort(option.value);
                setShowSort(false);
              }}
            >
              <Text style={styles.sortOptionText}>{option.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Add Filter Dropdown */}
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
        data={categoryItems}
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
            <Image source={imageMapping[item.images[0]]}  style={styles.itemImage} resizeMode='cover' />
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
  { label: 'Recommended', value: 'recommended' },
  { label: 'Newest', value: 'newest' },
  { label: 'Price: Low to High', value: 'price_low' },
  { label: 'Price: High to Low', value: 'price_high' },
];
