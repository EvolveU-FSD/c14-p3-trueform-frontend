import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { CustomizationService } from '../../services/customization.service';
import { CustomizationOption } from '../../types/customization';
import CustomizationScreenWrapper from '../../components/CustomizationScreenWrapper';
import CustomizationOptionGrid from '../../components/CustomizationOptionGrid';
import { useCustomization } from '../../context/CustomizationContext';
import { useTheme } from '../../theme/ThemeContext';
import { createStyles } from '../../styles/CustomizationOptionScreenStyles';

type RouteParams = {
  category: string;
  productType: string;
};

export default function CustomizationOptionScreen() {
  const route = useRoute();
  const { category, productType } = route.params as RouteParams;
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const { state, updateOption } = useCustomization();
  const [options, setOptions] = useState<CustomizationOption[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOptions = async () => {
      const fetchedOptions = await CustomizationService.getOptionsByCategory(category, productType);
      setOptions(fetchedOptions);
      setLoading(false);
    };
    fetchOptions();
  }, [category, productType]);

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
        options={options}
        selected={state[category as keyof typeof state]}
        onSelect={(value) => updateOption(category as keyof typeof state, value)}
      />
    </CustomizationScreenWrapper>
  );
}
