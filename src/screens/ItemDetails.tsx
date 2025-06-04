import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import itemsData from '../data/categoryItems.json';
import {styles} from '../styles/ItemDetailsStyles';



type ItemDetailsProps = {
  itemId?: string;
};

export default function ItemDetails(props: ItemDetailsProps) {
  // Support both navigation param and direct prop
  const route = useRoute<any>();
  const itemId = props.itemId || route.params?.itemId;

  const item = itemsData.find(i => i.id === itemId);

  if (!item) {
    return (
      <View style={styles.container}>
        <Text style={styles.notFound}>Item not found.</Text>
      </View>
    );
  }

  const images: string[] = item.images && item.images.length > 0
    ? item.images
    : [item.image];

  // Sample customization options (could be dynamic per item)
  const customizations = [
    { label: 'Collar Style', options: ['Spread', 'Button Down', 'Mandarin', 'Club', 'Cutaway', 'Tab', 'Wing'] },
    { label: 'Cuff Style', options: ['Single Button', 'Double Button', 'French'] },
    { label: 'Button Color', options: ['White', 'Black', 'Brown', 'Blue', 'Grey'] },
    { label: 'Length Option', options: ['Tucked', 'Untucked'] },
    { label: 'Monogram', options: ['None', 'Left Cuff', 'Right Cuff', 'Pocket', 'Hem'] }
  ];

  const [selectedOptions, setSelectedOptions] = React.useState<{ [key: string]: string }>({});
  const [showFabric, setShowFabric] = React.useState(false);
  const [showCustom, setShowCustom] = React.useState(false);

  const handleOptionChange = (label: string, value: string) => {
    setSelectedOptions(prev => ({ ...prev, [label]: value }));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Image Gallery */}
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={styles.imageGallery}
      >
        {images.map((img, idx) => (
          <Image
            key={img + idx}
            source={{ uri: img }}
            style={styles.image}
            resizeMode="cover"
          />
        ))}
      </ScrollView>
      <View style={styles.imageIndicatorContainer}>
        {images.map((_, idx) => (
          <View key={idx} style={styles.imageIndicator} />
        ))}
      </View>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>${item.price}</Text>
      <Text style={styles.desc}>{item.description}</Text>
      <View style={styles.metaContainer}>
        <Text style={styles.meta}>
          {item.color && `Color: ${item.color}`}
        </Text>
        <Text style={styles.meta}>
          {item.pattern && `Pattern: ${item.pattern}`}
        </Text>
        <Text style={styles.meta}>
          {item.style && `Style: ${item.style}`}
        </Text>
      </View>
      {/* Fabric Details Section (Collapsible) */}
      <TouchableOpacity style={styles.collapseHeader} onPress={() => setShowFabric(v => !v)}>
        <Text style={styles.collapseHeaderText}>Fabric Details</Text>
        <Text style={styles.collapseHeaderIcon}>{showFabric ? '▲' : '▼'}</Text>
      </TouchableOpacity>
      {showFabric && (
        <View style={styles.fabricSection}>
          <Text style={styles.fabricDetail}>
            {item.fabric
              ? item.fabric
              : 'fabric details not available'}
          </Text>
        </View>
      )}
      {/* Customization Options (Collapsible) */}
      <TouchableOpacity style={styles.collapseHeader} onPress={() => setShowCustom(v => !v)}>
        <Text style={styles.collapseHeaderText}>Optional Customizations (Free)</Text>
        <Text style={styles.collapseHeaderIcon}>{showCustom ? '▲' : '▼'}</Text>
      </TouchableOpacity>
      {showCustom && (
        <View style={styles.customSection}>
          {customizations.map(cust => (
            <View key={cust.label} style={styles.customRow}>
              <Text style={styles.customLabel}>{cust.label}:</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {cust.options.map(opt => (
                  <TouchableOpacity
                    key={opt}
                    style={[
                      styles.customOptionBtn,
                      selectedOptions[cust.label] === opt && styles.customOptionBtnActive
                    ]}
                    onPress={() => handleOptionChange(cust.label, opt)}
                  >
                    <Text style={selectedOptions[cust.label] === opt ? styles.customOptionTextActive : styles.customOptionText}>
                      {opt}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          ))}
          <Text style={styles.customHint}></Text>
        </View>
      )}
      {/* Add to Cart Button */}
      <TouchableOpacity style={styles.cartBtn} onPress={() => {/* TODO: Add to cart logic */}}>
        <Text style={styles.cartBtnText}>Add to Cart</Text>
      </TouchableOpacity>
      {/* Add more details here if needed */}
    </ScrollView>
  );
}

