import React, { useMemo } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../styles/CategoryItemsStyles';

import itemsData from '../data/categoryItems.json';

type CategoryItemsProps = {
  categoryId: string;
};

export default function CategoryItems({ categoryId }: CategoryItemsProps) {
  const navigation = useNavigation();

  // Get items for this category
  const categoryItems = useMemo(
    () => itemsData.filter(item => item.categoryId === categoryId),
    [categoryId]
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={categoryItems}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.gridContainer}
        columnWrapperStyle={styles.columnWrapper}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.itemCard}
            onPress={() => navigation.navigate('ItemDetails', { itemId: item.id })}
            activeOpacity={0.8}
          >
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: item.image }}
                style={styles.itemImage}
                resizeMode="cover"
              />
            </View>
            <View style={styles.itemContent}>
              <Text style={styles.itemName} numberOfLines={1}>
                {item.name}
              </Text>
              <Text style={styles.itemDescription} numberOfLines={1}>
                {item.description.split(' ').slice(0, 4).join(' ')}
              </Text>
              <Text style={styles.itemPrice}>
                ${parseFloat(item.price).toFixed(2)}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No items found.</Text>
        }
      />
    </View>
  );
}

