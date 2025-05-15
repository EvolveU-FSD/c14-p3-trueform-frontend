// src/components/ItemCard.tsx
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { ItemCardProps } from '../types/product';

const ItemCard: React.FC<ItemCardProps> = ({ product, onPress }) => {
    const handlePress = () => {
        if (onPress) {
            onPress(product);
        }
    };

    return (
        <TouchableOpacity style={styles.container} onPress={handlePress}>
            <Image source={{ uri: product.image }} style={styles.image} />
            <View style={styles.detailsContainer}>
                <Text style={styles.category}>{product.category}</Text>
                <Text style={styles.name}>{product.name}</Text>
                <Text style={styles.price}>${product.price}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 150,
        marginRight: 15,
    },
    image: {
        width: '100%',
        height: 180,
        borderRadius: 8,
        backgroundColor: '#f0f0f0', // Placeholder color
    },
    detailsContainer: {
        marginTop: 8,
    },
    category: {
        fontSize: 14,
        color: '#888',
        marginBottom: 2,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    price: {
        fontSize: 16,
        fontWeight: '600',
    },
});

export default ItemCard;