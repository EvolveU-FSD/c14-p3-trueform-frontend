import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { CustomizationProvider } from '../../context/CustomizationContext';
import { createStyles } from '../../styles/CustomizationScreenStyles';
import { useTheme } from '../../theme/ThemeContext';
import { ClothingService } from '../../services/clothing.service';
import { CustomizationService } from '../../services/customization.service';
import { Customization } from '../../types/customization';
import { RootStackParamList } from '../../types/navigation';
import CustomizationOptionGrid from '../../components/CustomizationOptionGrid';

export default function CustomizationScreen() {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, 'Customization'>>();
  const { itemId } = route.params;

  const [customizations, setCustomizations] = useState<Customization[]>([]);
  const [selectedCustomization, setSelectedCustomization] = useState<Customization | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const item = await ClothingService.getById(itemId);
        if (!item) {
          setError('Item not found');
          return;
        }

        const fetchedCustomizations = await CustomizationService.getCustomizationsByCategoryId(
          item.categoryId,
        );

        if (fetchedCustomizations.length === 0) {
          setError('No customization options available');
          return;
        }

        const sortedCustomizations = fetchedCustomizations.sort(
          (a, b) => a.sortOrder - b.sortOrder,
        );
        setCustomizations(sortedCustomizations);
        setSelectedCustomization(sortedCustomizations[0]); // Select first customization by default
      } catch (err) {
        console.error('Failed to fetch customizations:', err);
        setError('Failed to load customization options');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [itemId]);

  const handleCustomizationSelect = (customization: Customization) => {
    setSelectedCustomization(customization);
  };

  const handleOptionSelect = (optionId: string) => {
    if (selectedCustomization) {
      navigation.navigate('CustomizationOption', {
        itemId,
        category: selectedCustomization.type,
        options: selectedCustomization.options,
      });
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size='large' color={theme.primaryColor} />
      </View>
    );
  }

  if (error || customizations.length === 0) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error || 'No customization options available'}</Text>
      </View>
    );
  }

  return (
    <CustomizationProvider>
      <View style={styles.container}>
        {/* Customization Types ScrollView */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.stepsContainer}>
          {customizations.map((customization, index) => (
            <TouchableOpacity
              key={customization.id}
              style={[
                styles.stepItem,
                selectedCustomization?.type === customization.type && styles.activeStepItem,
              ]}
              onPress={() => handleCustomizationSelect(customization)}
            >
              <View
                style={[
                  styles.stepNumber,
                  selectedCustomization?.type === customization.type && styles.activeStepNumber,
                ]}
              >
                <Text style={styles.stepNumberText}>{index + 1}</Text>
              </View>
              <Text
                style={[
                  styles.stepTitle,
                  selectedCustomization?.type === customization.type && styles.activeStepTitle,
                ]}
              >
                {customization.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Options Grid */}
        {selectedCustomization && (
          <View style={styles.optionsContainer}>
            <Text style={styles.optionsTitle}>
              Select {selectedCustomization.name.toLowerCase()}
            </Text>
            <CustomizationOptionGrid
              options={selectedCustomization.options.map((option) => ({
                id: option.id,
                title: option.title,
                image: option.mediaUrl,
                description: '',
              }))}
              selected=''
              onSelect={handleOptionSelect}
            />
          </View>
        )}
      </View>
    </CustomizationProvider>
  );
}
