import React, { useState, useMemo } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, ScrollView, Dimensions, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../styles/CategoryItemsStyles';


let Picker: any;
try {
  Picker = require('@react-native-picker/picker').Picker;
} catch (e) {
  Picker = undefined;
}

import itemsData from '../data/categoryItems.json';

type CategoryItemsProps = {
  categoryId: string;
};

const FILTERABLE_FIELDS = [
  { label: 'Color', value: 'color' },
  { label: 'Pattern', value: 'pattern' },
  { label: 'Style', value: 'style' },
  { label: 'Name', value: 'name' }
];

const SORT_OPTIONS = [
  { label: 'Name (A-Z)', value: 'name_asc' },
  // { label: 'Name (Z-A)', value: 'name_desc' },
  { label: 'Price (Low-High)', value: 'price_asc' },
  { label: 'Price (High-Low)', value: 'price_desc' }
];

function getUniqueValues(items: any[], field: string) {
  const values = items.map(item => item[field]).filter(Boolean);
  return Array.from(new Set(values));
}

export default function CategoryItems({ categoryId }: CategoryItemsProps) {
  const [filterValuesState, setFilterValuesState] = useState<{ [key: string]: string }>({
    color: 'all',
    pattern: 'all',
    style: 'all',
    name: 'all'
  });
  const [sortOption, setSortOption] = useState('name_asc');
  const navigation = useNavigation();

  // Get items for this category
  const categoryItems = useMemo(
    () => itemsData.filter(item => item.categoryId === categoryId),
    [categoryId]
  );

  // Get unique values for each filter field
  const filterOptions = useMemo(() => {
    const options: { [key: string]: string[] } = {};
    FILTERABLE_FIELDS.forEach(f => {
      options[f.value] = ['all', ...getUniqueValues(categoryItems, f.value)];
    });
    return options;
  }, [categoryItems]);

  // Filter and sort items
  const filteredItems = useMemo(() => {
    let items = [...categoryItems];
    FILTERABLE_FIELDS.forEach(f => {
      const val = filterValuesState[f.value];
      if (val && val !== 'all') {
        items = items.filter(item =>
          String(item[f.value] || '').toLowerCase().includes(String(val).toLowerCase())
        );
      }
    });
    switch (sortOption) {
      case 'name_asc':
        items = items.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name_desc':
        items = items.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'price_asc':
        items = items.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        items = items.sort((a, b) => b.price - a.price);
        break;
    }
    return items;
  }, [categoryItems, filterValuesState, sortOption]);

  // Calculate how many filters fit per row based on screen width
  const screenWidth = Dimensions.get('window').width;
  const filterWidth = 140; // estimated width per filter dropdown+label
  const filtersPerRow = Math.max(1, Math.floor((screenWidth - 24) / filterWidth)); // 24 for padding/margin

  // Split filters into rows
  const filterRows: typeof FILTERABLE_FIELDS[][] = [];
  for (let i = 0; i < FILTERABLE_FIELDS.length; i += filtersPerRow) {
    filterRows.push(FILTERABLE_FIELDS.slice(i, i + filtersPerRow));
  }

  return (
    <View style={styles.container}>
      {/* Filters in rows */}
      {filterRows.map((row, rowIdx) => (
        <View style={styles.filterRow} key={`filter-row-${rowIdx}`}>
          {row.map(f => (
            <View style={styles.pickerContainer} key={f.value}>
              <Text style={{ fontSize: 12, color: '#333' }}>{f.label}</Text>
              {Picker ? (
                <Picker
                  selectedValue={filterValuesState[f.value]}
                  style={styles.picker}
                  onValueChange={(itemValue) =>
                    setFilterValuesState(prev => ({ ...prev, [f.value]: itemValue }))
                  }
                  mode="dropdown"
                >
                  {filterOptions[f.value].map(val => (
                    <Picker.Item
                      key={val}
                      label={val === 'all' ? 'All' : val.charAt(0).toUpperCase() + val.slice(1)}
                      value={val}
                    />
                  ))}
                </Picker>
              ) : (
                <Text style={{ color: 'red' }}>Install @react-native-picker/picker</Text>
              )}
            </View>
          ))}
        </View>
      ))}
      {/* Sort Options */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginBottom: 8 }}
        contentContainerStyle={{ paddingLeft: 0, paddingRight: 20 }}
      >
        <View style={[styles.sorts, { marginLeft: 0 }]}>
          {SORT_OPTIONS.map((s, idx) => (
            <TouchableOpacity
              key={s.value}
              style={[
                styles.sortBtn,
                sortOption === s.value && styles.sortBtnActive,
                idx === 0 && { marginLeft: 0 } // Remove left margin for the first button
              ]}
              onPress={() => setSortOption(s.value)}
            >
              <Text style={sortOption === s.value ? styles.sortTextActive : styles.sortText}>
                {s.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <FlatList
        data={filteredItems}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.itemCard}
            onPress={() => navigation.navigate('ItemDetails', { itemId: item.id })}
            activeOpacity={0.8}
          >
            <Image
              source={{ uri: item.image }}
              style={styles.itemImage}
              resizeMode="cover"
            />
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemDesc}>{item.description}</Text>
              <Text style={styles.itemPrice}>${item.price}</Text>
              {/* Show filterable fields */}
              <Text style={styles.itemMeta}>
                {item.color ? `Color: ${item.color}  ` : ''}
                {item.pattern ? `Pattern: ${item.pattern}  ` : ''}
                {item.style ? `Style: ${item.style}` : ''}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No items found.</Text>}
        horizontal={false}
      />

    </View>
  );
}

