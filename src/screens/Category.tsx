// Category.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, StatusBar, ScrollView, TouchableOpacity } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from 'types/navigation';
import { useTheme } from '../theme/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { createCategoryStyles } from '../styles/CategoryStyles';
import SearchBar from '../components/SearchBar';
import BottomNavBar from '../components/BottomNavBar';
import { CategoryService } from '../services/category.service';
import { Category as CategoryType } from '../types/category';

type CategoryScreenRouteProp = RouteProp<RootStackParamList, 'Category'>;
type CategoryScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Category'>;

export default function CategoryScreen() {
  const [activeTab, setActiveTab] = useState('home');
  const route = useRoute<CategoryScreenRouteProp>();
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Extract category slug from route params
  const { slug } = route.params;

  // Find category details based on slug
  const [categoryDetails, setCategoryDetails] = useState<CategoryType | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const fetchedCategories = await CategoryService.getAll();
        console.log(fetchedCategories);
        setCategories(fetchedCategories);

        // Find the current category by slug
        const currentCategory = await CategoryService.getBySlug(slug);
        if (currentCategory) {
          setCategoryDetails(currentCategory);
        } else {
          setError('Category not found');
        }
      } catch (err) {
        console.error('Failed to fetch categories:', err);
        setError('Failed to load categories');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [slug]);

  const { theme } = useTheme();
  const styles = createCategoryStyles(theme);
  const navigation = useNavigation<CategoryScreenNavigationProp>();

  const handleTabChange = (tabName: string) => {
    setActiveTab(tabName);
    if (tabName === 'home') {
      navigation.navigate('Home');
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.placeholderContainer}>
          <Text>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error || !categoryDetails) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.placeholderContainer}>
          <Text style={styles.placeholderText}>{error || 'Category not found'}</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={theme.isDarkMode ? 'light-content' : 'dark-content'} />

      <ScrollView>
        <SearchBar />

        <View style={styles.headerContainer}>
          <Text style={styles.categoryTitle}>{categoryDetails.name}</Text>
          <Text style={styles.subtitle}>{categoryDetails.description}</Text>
        </View>

        {/* Categories List */}
        <View style={styles.categoriesContainer}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              onPress={() => navigation.navigate('Category', { slug: category.slug })}
              style={styles.categoryItem}
            >
              <Text style={styles.categoryName}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <BottomNavBar activeTab={activeTab} onTabChange={handleTabChange} />
    </SafeAreaView>
  );
}
