// src/components/FeaturedItems.tsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { FeaturedItemsProps } from '../types/product';
import ItemCard from './ItemCard';

const FeaturedItems: React.FC<FeaturedItemsProps> = ({ title, items, seeAllLink }) => {
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

const styles = StyleSheet.create({
    container: {
        marginVertical: 16,
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
    scrollContent: {
        paddingHorizontal: 16,
        paddingBottom: 8,
    },
});

export default FeaturedItems;