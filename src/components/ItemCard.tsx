// src/components/ItemCard.tsx
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { ItemCardProps } from '../types/product';
import { useTheme } from '../theme/ThemeContext';
import { createStyles } from '../styles/ItemCardStyles';

const ItemCard: React.FC<ItemCardProps> = ({ product, onPress }) => {
    const { theme } = useTheme();
    const styles = createStyles(theme);

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

export default ItemCard;