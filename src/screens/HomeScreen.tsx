// src/screens/HomeScreen.tsx
import React, { useState } from 'react';
import { View, ScrollView, SafeAreaView, StyleSheet, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import SearchBar from '../components/SearchBar';
import NavButtons from '../components/NavButtons';
import HeroBanner from '../components/HeroBanner';
import CategorySection from '../components/CategorySection';
import FeaturedItems from '../components/FeaturedItems';
import BottomNavBar from '../components/BottomNavBar';
import { Product, Category } from '../types/product';
import { slugify } from '../utils/slugify';

const apparelImage = require('../../assets/images/categories/apparel.jpg');
const itemOneImage = require('../../assets/images/products/item1.jpg');
const itemTwoImage = require('../../assets/images/products/item2.jpg');
const itemThreeImage = require('../../assets/images/products/item3.jpg');
const heroBannerImage = require('../../assets/images/banners/hero-banner.jpg');

// Sample data for demonstration
const popularItems: Product[] = [
	{
		id: '1',
		image: itemOneImage,
		category: 'Polo',
		name: 'Polo Design 1',
		price: 80,
		isPopular: true,
	},
	{
		id: '2',
		image: itemTwoImage,
		category: 'Polo',
		name: 'Polo Button Up',
		price: 79,
		isPopular: true,
	},
	{
		id: '3',
		image: itemThreeImage,
		category: 'Polo',
		name: 'Polo Design 2',
		price: 59,
		isPopular: true,
	},
];

const categories: Category[] = [
	{ id: '1', name: 'Shirts', image: apparelImage },
	{ id: '2', name: 'Pants', image: apparelImage },
	{ id: '3', name: 'Jackets', image: apparelImage },
	{ id: '4', name: 'Apparel', image: apparelImage },
	{ id: '5', name: 'Accessories', image: apparelImage },
];

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export default function HomeScreen() {
	const [activeTab, setActiveTab] = useState('home');
	const navigation = useNavigation<HomeScreenNavigationProp>();

	// In HomeScreen.tsx
	// HomeScreen.tsx
	const handleCategoryPress = (category: Category) => {
		// Use the category ID as the slug
		navigation.navigate('Category', {
			slug: category.id,
		});
	};

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar barStyle='dark-content' />

			<ScrollView>
				<SearchBar />

				<NavButtons />

				<HeroBanner
					title='Tailor Made For You'
					image={heroBannerImage}
					onPress={() => console.log('Banner pressed')}
				/>

				<CategorySection categories={categories} onCategoryPress={handleCategoryPress} />

				<FeaturedItems title='Popular' items={popularItems} seeAllLink='/popular' />

				{/* You could add more FeaturedItems sections for different categories */}
			</ScrollView>

			<BottomNavBar activeTab={activeTab} onTabChange={(tabName) => setActiveTab(tabName)} />
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
});
