// src/components/CategorySection.tsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Category, CategorySectionProps } from '../types/product';

const CategoryItem: React.FC<{ category: Category; onPress?: (category: Category) => void }> = ({
    category,
    onPress
}) => {
    return (
        <TouchableOpacity
            style={styles.categoryItem}
            onPress={() => onPress && onPress(category)}
        >
            <View style={styles.imageContainer}>
                <Image source={{ uri: category.image }} style={styles.categoryImage} />
            </View>
            <Text style={styles.categoryName}>{category.name}</Text>
        </TouchableOpacity>
    );
};

const CategorySection: React.FC<CategorySectionProps> = ({ categories, onCategoryPress }) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Categories</Text>
                <TouchableOpacity>
                    <Text style={styles.seeAll}>See All</Text>
                </TouchableOpacity>
            </View>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.categoriesContainer}
            >
                {categories.map(category => (
                    <CategoryItem
                        key={category.id}
                        category={category}
                        onPress={onCategoryPress}
                    />
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 12,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginBottom: 12,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    seeAll: {
        fontSize: 14,
        color: '#666',
    },
    categoriesContainer: {
        paddingHorizontal: 16,
    },
    categoryItem: {
        alignItems: 'center',
        marginRight: 16,
        width: 80,
    },
    imageContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
        overflow: 'hidden',
    },
    categoryImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    categoryName: {
        fontSize: 14,
        textAlign: 'center',
    },
});

export default CategorySection;