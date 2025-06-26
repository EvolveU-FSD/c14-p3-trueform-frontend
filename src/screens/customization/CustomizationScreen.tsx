import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, Image, TouchableOpacity, Button, Dimensions } from 'react-native';
import { CustomizationProvider, useCustomization } from '../../context/CustomizationContext';
import { CustomizationService } from '../../services/customization.service';
import { useRoute } from '@react-navigation/native';
import createStyles from '../../styles/CustomizationScreenStyles';
import { ClothingService } from '../../services/clothing.service';
import { getImageUrl } from '../../utils/imageHandling';

export default function CustomizationScreen() {
  const styles = createStyles();
  const route = useRoute<any>();
  const { itemId } = route.params;

  const { selections, setSelection } = useCustomization();
  const [customizations, setCustomizations] = useState<any[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    (async () => {
      const item = await ClothingService.getById(itemId);
      const response = await CustomizationService.getCustomizationsByCategoryId(item.categoryId);
      setCustomizations(response);
    })();
  }, []);

  const activeCustomization = customizations[activeIndex];

  return (
    <CustomizationProvider>
      <View style={styles.container}>
        {/* Top Nav */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.stepsContainer}>
          {customizations.map((c, idx) => (
            <TouchableOpacity
              key={c.id}
              onPress={() => setActiveIndex(idx)}
              style={styles.stepItem}
            >
              <View style={[styles.circle, idx === activeIndex && styles.activeCircle]}>
                <Text style={styles.stepNumberText}>{idx + 1}</Text>
              </View>
              <Text style={styles.stepTitle}>{c.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Line separator */}
        <View style={styles.line} />

        {/* Customization Options */}
        <ScrollView contentContainerStyle={styles.optionsContainer}>
          {activeCustomization?.options.map((opt: any) => (
            <TouchableOpacity
              key={opt.id}
              onPress={() => setSelection(activeCustomization.id, opt.id)}
              style={[
                styles.optionBox,
                selections[activeCustomization.id] === opt.id && styles.optionBoxSelected,
              ]}
            >
              <Image source={{ uri: getImageUrl(opt.mediaUrl) }} style={styles.optionImage} />
              <Text>{opt.title}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </CustomizationProvider>
  );
}
