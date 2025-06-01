import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import itemsData from '../data/categoryItems.json';

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
              : 'Premium 100% cotton, soft finish, breathable, and durable. Machine washable.'}
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
          <Text style={styles.customHint}>Add it to your cart to begin customizing.</Text>
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

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: { alignItems: 'center', padding: 20 },
  imageGallery: { width: screenWidth, height: 260, marginBottom: 10 },
  image: { width: screenWidth - 40, height: 220, borderRadius: 12, marginHorizontal: 10, backgroundColor: '#eee' },
  imageIndicatorContainer: { flexDirection: 'row', justifyContent: 'center', marginBottom: 8 },
  imageIndicator: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#bbb', margin: 3 },
  name: { fontSize: 22, fontWeight: 'bold', marginBottom: 8 },
  price: { fontSize: 18, color: '#007b55', fontWeight: 'bold', marginBottom: 8 },
  desc: { fontSize: 16, color: '#444', marginBottom: 12, textAlign: 'center' },
  metaContainer: { marginTop: 8, width: '100%' },
  meta: { fontSize: 15, color: '#666', marginBottom: 4 },
  notFound: { fontSize: 18, color: 'red', marginTop: 40 },
  cartBtn: {
    marginTop: 24,
    backgroundColor: '#007b55',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 32,
    alignItems: 'center'
  },
  cartBtnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold'
  },
  customSection: { width: '100%', marginTop: 20, marginBottom: 8, backgroundColor: '#f8f8f8', borderRadius: 8, padding: 12 },
  customTitle: { fontWeight: 'bold', fontSize: 16, marginBottom: 8, color: '#222' },
  customRow: { marginBottom: 10 },
  customLabel: { fontSize: 15, color: '#333', marginBottom: 4 },
  customOptionBtn: { paddingVertical: 6, paddingHorizontal: 12, borderRadius: 16, backgroundColor: '#eee', marginRight: 8 },
  customOptionBtnActive: { backgroundColor: '#007b55' },
  customOptionText: { color: '#333' },
  customOptionTextActive: { color: '#fff', fontWeight: 'bold' },
  customHint: { color: '#007bff', marginTop: 8, fontSize: 14 },
  fabricSection: {
    width: '100%',
    marginTop: 12,
    marginBottom: 8,
    backgroundColor: '#f3f3f3',
    borderRadius: 8,
    padding: 12
  },
  fabricTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
    color: '#222'
  },
  fabricDetail: {
    fontSize: 15,
    color: '#444'
  },
  collapseHeader: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 4,
    backgroundColor: '#f3f3f3',
    borderRadius: 8,
    marginTop: 12
  },
  collapseHeaderText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#222'
  },
  collapseHeaderIcon: {
    fontSize: 18,
    color: '#888'
  },
});
