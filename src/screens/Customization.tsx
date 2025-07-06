import React, { useEffect, useState, useRef } from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { CustomizationProvider, useCustomization } from '../context/CustomizationContext';
import { useCart } from '../context/CartContext';
import { CustomizationService } from '../services/customization.service';
import { useRoute, useNavigation } from '@react-navigation/native';
import createStyles from '../styles/CustomizationScreenStyles';
import { ClothingService } from '../services/clothing.service';
import { getImageUrl } from '../utils/imageHandling';
import { CartCustomization } from '../types/cart';
import { Clothing } from '../types/clothing';
import { useTheme } from '../theme/ThemeContext';

const { width: screenWidth } = Dimensions.get('window');

export default function CustomizationScreen() {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const route = useRoute<any>();
  const navigation = useNavigation();
  const { itemId } = route.params;

  const { selections, handleSelection } = useCustomization();
  const { addItem } = useCart();
  const [customizations, setCustomizations] = useState<any[]>([]);
  const [item, setItem] = useState<Clothing | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const scrollViewRef = useRef<ScrollView>(null);

  // Constants for scroll calculation
  const STEP_ITEM_WIDTH = 80;
  const CONTAINER_PADDING = 16;

  useEffect(() => {
    const fetchItemAndCustomizations = async () => {
      setLoading(true);
      try {
        const fetchedItem = await ClothingService.getById(itemId);
        const response = await CustomizationService.getCustomizationsByCategoryId(
          fetchedItem.categoryId,
        );
        setItem(fetchedItem);
        setCustomizations(response);
      } catch (error) {
        console.error('Error fetching item or customizations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchItemAndCustomizations();
  }, [itemId]);

  // Auto-scroll to keep active step visible
  useEffect(() => {
    if (scrollViewRef.current && customizations.length > 0) {
      const scrollToActiveStep = () => {
        const activeStepPosition = activeIndex * STEP_ITEM_WIDTH;
        const containerWidth = screenWidth - CONTAINER_PADDING * 2;
        const totalScrollWidth = customizations.length * STEP_ITEM_WIDTH;

        if (totalScrollWidth <= containerWidth) {
          return;
        }

        let targetScrollX = 0;

        if (activeIndex === 0) {
          targetScrollX = 0;
        } else if (activeIndex === customizations.length - 1) {
          targetScrollX = Math.max(0, totalScrollWidth - containerWidth);
        } else {
          targetScrollX = Math.max(
            0,
            activeStepPosition - containerWidth / 2 + STEP_ITEM_WIDTH / 2,
          );
          targetScrollX = Math.min(targetScrollX, totalScrollWidth - containerWidth);
        }

        scrollViewRef.current?.scrollTo({
          x: targetScrollX,
          animated: true,
        });
      };

      const timeoutId = setTimeout(scrollToActiveStep, 100);
      return () => clearTimeout(timeoutId);
    }
  }, [activeIndex, customizations.length]);

  const activeCustomization = customizations[activeIndex];

  const handleNext = () => {
    if (activeIndex < customizations.length - 1) {
      setActiveIndex(activeIndex + 1);
    } else {
      // Add to cart when customization is complete
      if (item) {
        const cartCustomizations: CartCustomization[] = customizations
          .map((customization) => {
            const selectedOptionId = selections[customization.id];
            const selectedOption = customization.options.find(
              (opt: any) => opt.id === selectedOptionId,
            );

            return {
              customizationId: customization.id,
              customizationName: customization.name,
              optionId: selectedOptionId,
              optionName: selectedOption?.name || 'Unknown',
              priceModifier: selectedOption?.priceModifier || 0,
            };
          })
          .filter((customization) => customization.optionId); // Only include selected customizations

        addItem(item, cartCustomizations);
      }

      navigation.navigate('Cart' as never);
    }
  };

  const handlePrevious = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    } else {
      navigation.goBack();
    }
  };

  const handleStepPress = (index: number) => {
    setActiveIndex(index);
  };

  const isFirstStep = activeIndex === 0;
  const isLastStep = activeIndex === customizations.length - 1;

  // Check if current step has a selection
  const hasCurrentSelection = activeCustomization && selections[activeCustomization.id];
  const isNextDisabled = !hasCurrentSelection;

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
        {/* Top Nav */}
        <ScrollView
          ref={scrollViewRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.stepsContainer}
          contentContainerStyle={styles.stepsContentContainer}
        >
          {customizations.map((c, idx) => (
            <TouchableOpacity
              key={c.id}
              onPress={() => handleStepPress(idx)}
              style={[styles.stepItem, idx === activeIndex && styles.activeStepItem]}
            >
              <View style={[styles.circle, idx === activeIndex && styles.activeCircle]}>
                <Text style={styles.stepNumberText}>{idx + 1}</Text>
              </View>
              <Text style={[styles.stepTitle, idx === activeIndex && styles.activeStepTitle]}>
                {c.name}
              </Text>
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
              onPress={() => handleSelection(activeCustomization.id, opt.id)}
              style={[
                styles.optionBox,
                selections[activeCustomization.id] === opt.id && styles.optionBoxSelected,
              ]}
            >
              <Image source={{ uri: getImageUrl(opt.mediaUrl) }} style={styles.optionImage} />
              <Text style={styles.optionText}>{opt.name}</Text>
              {opt.priceModifier && opt.priceModifier !== 0 && (
                <Text style={styles.priceModifier}>
                  {opt.priceModifier > 0 ? '+' : ''}${opt.priceModifier}
                </Text>
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Navigation Buttons */}
        <View style={styles.navigationContainer}>
          <TouchableOpacity
            style={[styles.navButton, styles.previousButton]}
            onPress={handlePrevious}
            disabled={isFirstStep}
          >
            <Text style={[styles.navButtonText, isFirstStep && styles.disabledButtonText]}>
              {isFirstStep ? 'Back' : 'Previous'}
            </Text>
          </TouchableOpacity>

          <Text style={styles.stepIndicator}>
            {activeIndex + 1} of {customizations.length}
          </Text>

          <TouchableOpacity
            style={[styles.navButton, styles.nextButton, isNextDisabled && styles.disabledButton]}
            onPress={handleNext}
            disabled={isNextDisabled}
          >
            <Text style={[styles.nextButtonText, isNextDisabled && styles.disabledButtonText]}>
              {isLastStep ? 'Add to Cart' : 'Next'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </CustomizationProvider>
  );
}
