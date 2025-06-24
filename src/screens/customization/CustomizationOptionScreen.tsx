import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { CustomizationService } from '../../services/customization.service';
import { CustomizationOption } from '../../types/customization';
import CustomizationScreenWrapper from '../../components/CustomizationScreenWrapper';
import CustomizationOptionGrid from '../../components/CustomizationOptionGrid';
import { useCustomization } from '../../context/CustomizationContext';
import { useTheme } from '../../theme/ThemeContext';
import { createStyles } from '../../styles/CustomizationOptionScreenStyles';
import { RootStackParamList } from '../../types/navigation';

type RouteParams = {
  category: string;
  productType: string;
};

export default function CustomizationOptionScreen() {
  const route = useRoute<RouteProp<RootStackParamList, 'CustomizationOption'>>();
  const { category, productType } = route.params;
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const { state, updateOption } = useCustomization();
  const [options, setOptions] = useState<CustomizationOption[]>([]);
  const [loading, setLoading] = useState(true);

  console.log(category);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const fetchedOptions = await CustomizationService.getOptionsByCategory(
          category,
          productType,
        );
        setOptions(fetchedOptions);
      } catch (err) {
        console.error('Failed to fetch options:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOptions();
  }, [category, productType]);

  // Convert the database options to match the CustomizationOptionGrid format
  const gridOptions = options.map((option) => ({
    id: option.id,
    title: option.name,
    image: { uri: option.imageUrl },
    description: option.description,
  }));

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size='large' color={theme.primaryColor} />
      </View>
    );
  }

  return (
    <CustomizationScreenWrapper currentStep={category}>
      <CustomizationOptionGrid
        options={gridOptions}
        selected={state[category as keyof typeof state]}
        onSelect={(value) => updateOption(category as keyof typeof state, value)}
      />
    </CustomizationScreenWrapper>
  );
}
