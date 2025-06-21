// Category.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, StatusBar, ScrollView } from 'react-native';
import { CategoryScreenProps } from '../types/navigation';
import { useTheme } from '../theme/ThemeContext';
import createStyles from '../styles/CategoryStyles';
import SearchBar from '../components/SearchBar';
import BottomNavBar from '../components/BottomNavBar';

// Sample categories data - replace with your actual data source
const CATEGORIES = [
  { id: '1', name: 'Shirts', description: 'Explore our shirt collection' },
  { id: '2', name: 'Pants', description: 'Find your perfect pants' },
  { id: '3', name: 'Jackets', description: 'Stay warm with our jackets' },
  { id: '4', name: 'Apparel', description: 'Complete your wardrobe' },
  { id: '5', name: 'Accessories', description: 'Finish your look' },
];

export default function CategoryScreen({ navigation, route }: CategoryScreenProps) {
  const styles = createStyles();
  const [activeTab, setActiveTab] = useState('home');

  // Extract category ID from slug
  const { slug: categoryId } = route.params;

  // Find category details based on ID
  const [categoryDetails, setCategoryDetails] = useState({
    id: '',
    name: '',
    description: '',
  });

  useEffect(() => {
    // Look up category by ID
    const category = CATEGORIES.find((cat) => cat.id === categoryId);

    if (category) {
      setCategoryDetails({
        id: category.id,
        name: category.name,
        description: category.description,
      });
    } else {
      // Fallback if no category found
      setCategoryDetails({
        id: categoryId,
        name: 'Unknown Category',
        description: 'Category not found',
      });
    }
  }, [categoryId]);



  const handleTabChange = (tabName: string) => {
    setActiveTab(tabName);

    if (tabName === 'home') {
      navigation.navigate('Home');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'light-content'} />

      <ScrollView>
        <SearchBar />

        <View style={styles.headerContainer}>
          <Text style={styles.categoryTitle}>{categoryDetails.name}</Text>
          <Text style={styles.subtitle}>{categoryDetails.description}</Text>
        </View>

        <View style={styles.placeholderContainer}>
          <Text style={styles.placeholderText}>
            This is the {categoryDetails.name} category page.
          </Text>
          <Text style={styles.placeholderSubtext}>Products will be displayed here soon.</Text>
          <Text style={styles.placeholderSubtext}>Category ID: {categoryDetails.id}</Text>
        </View>
      </ScrollView>

      <BottomNavBar activeTab={activeTab} onTabChange={handleTabChange} />
    </SafeAreaView>
  );
}
