import React, { useState, useMemo, useEffect } from 'react';
import { SafeAreaView, StatusBar, View, Text, TouchableOpacity, FlatList, Image, StyleSheet } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import itemsData from '../data/categoryItems.json';
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
  ]
};

export default function Items() {
  const navigation = useNavigation();
  const route = useRoute<any>();
  const { theme } = useTheme();
  const { slug: categoryId } = route.params;

  // States
  const [showSort, setShowSort] = useState(false);
  const [selectedSort, setSelectedSort] = useState('recommended');
  const [showFilter, setShowFilter] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [collapsedSections, setCollapsedSections] = useState({
    colors: true,
    patterns: true
  });

  // Filter items for this category
  const categoryItems = useMemo(
    () => itemsData.filter(item => item.categoryId === categoryId),
    [categoryId]
  );

  const handleBackPress = () => {
    navigation.navigate('Home');
  };

  const toggleSection = (section: 'colors' | 'patterns') => {
    setCollapsedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerLeft: () => (
        <TouchableOpacity 
          onPress={handleBackPress}
          style={styles.backButton}
        >
          <FontAwesome5 name="chevron-left" size={20} color="#333" />
        </TouchableOpacity>
      ),
      headerTitle: '',
      headerShadowVisible: false,
    });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header with Sort and Filter */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.headerButton}
          onPress={() => setShowSort(!showSort)}
        >
          <Text style={styles.headerButtonText}>Sort By: {selectedSort}</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.headerButton}
          onPress={() => setShowFilter(!showFilter)}
        >
          <FontAwesome5 name="sliders-h" size={20} color="#333" />
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
                selectedSort === option.value && styles.sortOptionSelected
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
          <TouchableOpacity 
            style={styles.filterHeader}
            onPress={() => toggleSection('colors')}
          >
            <Text style={styles.filterTitle}>Fabric Color</Text>
            <FontAwesome5 
              name={collapsedSections.colors ? 'plus' : 'minus'} 
              size={16} 
              color="#333" 
            />
          </TouchableOpacity>
          {!collapsedSections.colors && (
            <View style={styles.filterOptions}>
              {FILTER_OPTIONS.colors.map((color) => (
                <TouchableOpacity
                  key={`color-${color.value}`}
                  style={[
                    styles.filterOption,
                    selectedFilters.includes(color.value) && styles.filterOptionSelected
                  ]}
                  onPress={() => {
                    setSelectedFilters(prev => 
                      prev.includes(color.value)
                        ? prev.filter(v => v !== color.value)
                        : [...prev, color.value]
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
              color="#333" 
            />
          </TouchableOpacity>
          {!collapsedSections.patterns && (
            <View style={styles.filterOptions}>
              {FILTER_OPTIONS.patterns.map((pattern) => (
                <TouchableOpacity
                  key={`pattern-${pattern.value}`}
                  style={[
                    styles.filterOption,
                    selectedFilters.includes(pattern.value) && styles.filterOptionSelected
                  ]}
                  onPress={() => {
                    setSelectedFilters(prev => 
                      prev.includes(pattern.value)
                        ? prev.filter(v => v !== pattern.value)
                        : [...prev, pattern.value]
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
        keyExtractor={item => item.id}
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
              source={{ uri: item.image }}
              style={styles.itemImage}
              resizeMode="cover"
            />
            <View style={styles.itemContent}>
              <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  headerButtonText: {
    fontSize: 16,
    color: '#333',
  },
  backButton: {
    padding: 12,
  },
  gridContainer: {
    padding: 8,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  itemCard: {
    width: '48%',
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  itemImage: {
    width: '100%',
    aspectRatio: 1,
  },
  itemContent: {
    padding: 8,
  },
  itemName: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007b55',
  },
  sortDropdown: {
    position: 'absolute',
    top: 50,
    left: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    zIndex: 1000,
  },
  sortOption: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  sortOptionSelected: {
    backgroundColor: '#f5f5f5',
  },
  sortOptionText: {
    fontSize: 14,
    color: '#333',
  },
  filterDropdown: {
    position: 'absolute',
    top: 50,
    right: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 1000,
    minWidth: 200,
    padding: 16,
  },
  filterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  filterOptions: {
    flexDirection: 'column',
  },
  filterOption: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  filterOptionSelected: {
    backgroundColor: '#f5f5f5',
  },
  filterOptionText: {
    fontSize: 14,
    color: '#333',
  },
});
