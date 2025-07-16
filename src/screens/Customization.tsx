import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CustomizationProvider } from '../../context/CustomizationContext';
import { CustomizationService } from '../../services/customization.service';
import { CustomizationCategory } from '../types/customization';
import { createStyles } from '../../styles/CustomizationScreenStyles';
import { useTheme } from '../../theme/ThemeContext';

export default function CustomizationScreen() {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const navigation = useNavigation();
  const [categories, setCategories] = useState<CustomizationCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOptions, setSelectedOptions] = useState<{ [categoryId: string]: string }>({});

  useEffect(() => {
    const fetchCategories = async () => {
      const fetchedCategories = await CustomizationService.getCategories('shirt');
      setCategories(fetchedCategories);

      // Set default selections for each category based on API defaultValue
      const defaults: { [categoryId: string]: string } = {};
      fetchedCategories.forEach(category => {
        if (category.options && category.options.length > 0) {
          // Use defaultValue from API if available, otherwise use first option
          const defaultOptionId = category.defaultValue || category.options[0].id;
          
          // Verify the default option exists in the options array
          const defaultOptionExists = category.options.some((opt: any) => opt.id === defaultOptionId);
          
          if (defaultOptionExists) {
            defaults[category.id] = defaultOptionId;
          } else {
            // Fallback to first option if default doesn't exist
            defaults[category.id] = category.options[0].id;
          }
        }
      });
      setSelectedOptions(defaults);

      setLoading(false);
    };
    fetchCategories();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size='large' color={theme.primaryColor} />
      </View>
    );
  }

  return (
    <CustomizationProvider>
      <View style={styles.container}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.stepsContainer}>
          {categories.map((category, index) => (
            <TouchableOpacity
              key={category.id}
              style={styles.stepItem}
              onPress={() =>
                navigation.navigate('CustomizationOption', {
                  category: category.id,
                  productType: 'shirt',
                })
              }
            >
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>{index + 1}</Text>
              </View>
              <Text style={styles.stepTitle}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <View style={styles.content}>
          <Text style={styles.startText}>
            Select {categories[0]?.name.toLowerCase()} to begin customization
          </Text>
          <TouchableOpacity
            style={styles.startButton}
            onPress={() =>
              navigation.navigate('CustomizationOption', {
                category: categories[0]?.id,
                productType: 'shirt',
              })
            }
          >
            <Text style={styles.startButtonText}>Start Customization</Text>
          </TouchableOpacity>
        </View>
      </View>
    </CustomizationProvider>
  );
}
