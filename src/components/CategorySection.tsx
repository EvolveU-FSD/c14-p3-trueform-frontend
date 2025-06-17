// src/components/CategorySection.tsx
import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Category, CategorySectionProps } from '../types/product';
import { useTheme } from '../theme/ThemeContext';
import { createStyles } from '../styles/CategorySectionStyles';

function CategoryItem({
  category,
  onPress,
  styles,
}: {
  category: Category;
  onPress?: (category: Category) => void;
  styles: any; // Pass styles as prop
}) {
  return (
    <TouchableOpacity style={styles.categoryItem} onPress={() => onPress && onPress(category)}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: category.image }} style={styles.categoryImage} />
      </View>
      <Text style={styles.categoryName}>{category.name}</Text>
    </TouchableOpacity>
  );
}

export default function CategorySection({ categories, onCategoryPress }: CategorySectionProps) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

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
        {categories.map((category) => (
          <CategoryItem
            key={category.id}
            category={category}
            onPress={onCategoryPress}
            styles={styles} // Pass styles to CategoryItem
          />
        ))}
      </ScrollView>
    </View>
  );
}
