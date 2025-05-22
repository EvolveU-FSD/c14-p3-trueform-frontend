// src/components/FeaturedItems.tsx
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { FeaturedItemsProps } from '../types/product';
import ItemCard from './ItemCard';
import { useTheme } from '../theme/ThemeContext';
import { createStyles } from '../styles/FeaturedItemsStyles';

const FeaturedItems: React.FC<FeaturedItemsProps> = ({ title, items, seeAllLink }) => {
    const { theme } = useTheme();
    const styles = createStyles(theme);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>{title}</Text>
                {seeAllLink && (
                    <TouchableOpacity>
                        <Text style={styles.seeAll}>See All</Text>
                    </TouchableOpacity>
                )}
            </View>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {items.map((item) => (
                    <ItemCard
                        key={item.id}
                        product={item}
                        onPress={(product) => console.log('Product selected:', product.name)}
                    />
                ))}
            </ScrollView>
        </View>
    );
};

export default FeaturedItems;