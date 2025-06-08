// Category.tsx
import React, { useState } from 'react';
import { SafeAreaView, StatusBar, ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from 'types/navigation';
import { useTheme } from '../theme/ThemeContext';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { createCategoryStyles } from '../styles/CategoryStyles';
import CategoryItems from '../screens/CategoryItems';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

type CategoryScreenRouteProp = RouteProp<RootStackParamList, 'Category'>;
type CategoryScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Category'>;

const SORT_OPTIONS = [
  { label: 'Recommended', value: 'recommended' },
  { label: 'Newest', value: 'newest' },
  { label: 'Lowest Price', value: 'price_low' },
  { label: 'Highest Price', value: 'price_high' },
];

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

export default function CategoryScreen() {
  const navigation = useNavigation<CategoryScreenNavigationProp>();
  const route = useRoute<CategoryScreenRouteProp>();
  const { slug: categoryId } = route.params;
  const { theme } = useTheme();
  const styles = createCategoryStyles(theme);

  const [showSort, setShowSort] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [selectedSort, setSelectedSort] = useState('recommended');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [collapsedSections, setCollapsedSections] = useState({
    colors: true,    // Changed from false to true
    patterns: true   // Changed from false to true
  });

  const handleBackPress = () => {
    navigation.navigate('Home');
  };

  const toggleSection = (section: 'colors' | 'patterns') => {
    setCollapsedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  React.useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerLeft: () => (
        <TouchableOpacity 
          onPress={handleBackPress}
          style={headerStyles.backButton}
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
      <StatusBar barStyle={theme.isDarkMode ? "light-content" : "dark-content"} />
      
      {/* Header with Sort and Filter */}
      <View style={headerStyles.header}>
        <TouchableOpacity 
          style={headerStyles.headerButton}
          onPress={() => setShowSort(!showSort)}
        >
          <Text style={headerStyles.headerButtonText}>Sort By: {
            SORT_OPTIONS.find(option => option.value === selectedSort)?.label
          }</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={headerStyles.headerButton}
          onPress={() => setShowFilter(!showFilter)}
        >
          <FontAwesome5 name="sliders-h" size={20} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Sort Options Dropdown */}
      {showSort && (
        <View style={headerStyles.sortDropdown}>
          {SORT_OPTIONS.map((option) => (
            <TouchableOpacity
              key={option.value}
              style={[
                headerStyles.sortOption,
                selectedSort === option.value && headerStyles.sortOptionSelected
              ]}
              onPress={() => {
                setSelectedSort(option.value);
                setShowSort(false);
              }}
            >
              <Text style={headerStyles.sortOptionText}>{option.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Filter Options Dropdown */}
      {showFilter && (
        <View style={headerStyles.filterDropdown}>
          {/* Colors Section */}
          <TouchableOpacity 
            style={headerStyles.filterHeader}
            onPress={() => toggleSection('colors')}
          >
            <Text style={headerStyles.filterTitle}>Fabric Color</Text>
            <FontAwesome5 
              name={collapsedSections.colors ? 'plus' : 'minus'} 
              size={16} 
              color="#333" 
            />
          </TouchableOpacity>
          {!collapsedSections.colors && (
            <View style={headerStyles.filterOptions}>
              {FILTER_OPTIONS.colors.map((color) => (
                <TouchableOpacity
                  key={`color-${color.value}`}
                  style={[
                    headerStyles.filterOption,
                    selectedFilters.includes(color.value) && headerStyles.filterOptionSelected
                  ]}
                  onPress={() => {
                    setSelectedFilters(prev => 
                      prev.includes(color.value)
                        ? prev.filter(v => v !== color.value)
                        : [...prev, color.value]
                    );
                  }}
                >
                  <Text style={headerStyles.filterOptionText}>{color.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Patterns Section */}
          <TouchableOpacity 
            style={[headerStyles.filterHeader, { marginTop: 16 }]}
            onPress={() => toggleSection('patterns')}
          >
            <Text style={headerStyles.filterTitle}>Pattern</Text>
            <FontAwesome5 
              name={collapsedSections.patterns ? 'plus' : 'minus'} 
              size={16} 
              color="#333" 
            />
          </TouchableOpacity>
          {!collapsedSections.patterns && (
            <View style={headerStyles.filterOptions}>
              {FILTER_OPTIONS.patterns.map((pattern) => (
                <TouchableOpacity
                  key={`pattern-${pattern.value}`}
                  style={[
                    headerStyles.filterOption,
                    selectedFilters.includes(pattern.value) && headerStyles.filterOptionSelected
                  ]}
                  onPress={() => {
                    setSelectedFilters(prev => 
                      prev.includes(pattern.value)
                        ? prev.filter(v => v !== pattern.value)
                        : [...prev, pattern.value]
                    );
                  }}
                >
                  <Text style={headerStyles.filterOptionText}>{pattern.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      )}

      <ScrollView>
        <CategoryItems categoryId={categoryId} />
      </ScrollView>
    </SafeAreaView>
  );
}

const headerStyles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
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
    marginRight: 4,
    color: '#333',
  },
  sortDropdown: {
    position: 'absolute',
    top: 50,
    left: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
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
  backButton: {
    padding: 12,
    marginLeft: 8,
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