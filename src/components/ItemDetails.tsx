import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
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

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />
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
      {/* Add more details here if needed */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', padding: 20 },
  image: { width: 220, height: 220, borderRadius: 12, marginBottom: 16, backgroundColor: '#eee' },
  name: { fontSize: 22, fontWeight: 'bold', marginBottom: 8 },
  price: { fontSize: 18, color: '#007b55', fontWeight: 'bold', marginBottom: 8 },
  desc: { fontSize: 16, color: '#444', marginBottom: 12, textAlign: 'center' },
  metaContainer: { marginTop: 8, width: '100%' },
  meta: { fontSize: 15, color: '#666', marginBottom: 4 },
  notFound: { fontSize: 18, color: 'red', marginTop: 40 }
});
