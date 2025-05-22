import React, { useState } from 'react';
import { View, Text, SafeAreaView, StatusBar, ScrollView } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from 'types/navigation';
import { useTheme } from '../theme/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { createCategoryStyles } from '../styles/CategoryStyles';
import SearchBar from '../components/SearchBar';
import BottomNavBar from '../components/BottomNavBar';

type CategoryScreenRouteProp = RouteProp<RootStackParamList, 'Category'>;
type CategoryScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Category'>;

export default function CategoryScreen() {
  const [activeTab, setActiveTab] = useState('home');
  const route = useRoute<CategoryScreenRouteProp>();
  const { categoryId, categoryName } = route.params;
  const { theme } = useTheme();
  const styles = createCategoryStyles(theme);

  const navigation = useNavigation<CategoryScreenNavigationProp>();

  const handleTabChange = (tabName: string) => {
    setActiveTab(tabName);

    if (tabName === 'home') {
      navigation.navigate('Home');
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={theme.isDarkMode ? "light-content" : "dark-content"} />

      <ScrollView>
        <SearchBar />

        <View style={styles.headerContainer}>
          <Text style={styles.categoryTitle}>{categoryName}</Text>
          <Text style={styles.subtitle}>Discover our collection</Text>
        </View>

        <View style={styles.placeholderContainer}>
          <Text style={styles.placeholderText}>
            This is the {categoryName} category page.
          </Text>
          <Text style={styles.placeholderSubtext}>
            Products will be displayed here soon.
          </Text>
        </View>
      </ScrollView>

      <BottomNavBar
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />
    </SafeAreaView>
  );
}
