import React, { useEffect, useState, useRef } from 'react';
import { ScrollView, View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import { CustomizationProvider, useCustomization } from '../../context/CustomizationContext';
import { CustomizationService } from '../../services/customization.service';
import { useRoute, useNavigation } from '@react-navigation/native';
import createStyles from '../../styles/CustomizationScreenStyles';
import { ClothingService } from '../../services/clothing.service';
import { useCart } from '../../context/CartContext';
import { Clothing } from '../../types/clothing';
import { CartCustomization } from '../../types/context/cart.types';
import { getImageUrl } from '../../utils/imageHandling';

const { width: screenWidth } = Dimensions.get('window');

export default function CustomizationScreen() {
  const styles = createStyles();
  const route = useRoute<any>();
  const navigation = useNavigation();
  const { itemId } = route.params;

  const { selections, handleSelection } = useCustomization();
  const { addItem } = useCart();
  const [customizations, setCustomizations] = useState<any[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [clothingItem, setClothingItem] = useState<Clothing | null>(null);
  const scrollViewRef = useRef<ScrollView>(null);

  // Constants for scroll calculation
  const STEP_ITEM_WIDTH = 80; // Approximate width of each step item including margins
  const CONTAINER_PADDING = 16; // Horizontal padding of stepsContainer

  // Fetch clothing item details
  useEffect(() => {
    const fetchClothingItem = async () => {
      if (itemId) {
        try {
          const item = await ClothingService.getById(itemId);
          setClothingItem(item);
        } catch (error) {
          console.error('Failed to fetch clothing item:', error);
        }
      }
    };

    fetchClothingItem();
  }, [itemId]);

  useEffect(() => {
    if (clothingItem) {
      (async () => {
        const response = await CustomizationService.getCustomizationsByCategoryId(
          clothingItem.categoryId,
        );
        setCustomizations(response);
      })();
    }
  }, [clothingItem]);

  // Auto-scroll to keep active step visible
  useEffect(() => {
    if (scrollViewRef.current && customizations.length > 0) {
      const scrollToActiveStep = () => {
        const activeStepPosition = activeIndex * STEP_ITEM_WIDTH;
        const containerWidth = screenWidth - CONTAINER_PADDING * 2;
        const totalScrollWidth = customizations.length * STEP_ITEM_WIDTH;

        // If the content fits in the container, don't scroll
        if (totalScrollWidth <= containerWidth) {
          return;
        }

        // Determine scroll position to keep active step visible
        let targetScrollX = 0;

        if (activeIndex === 0) {
          // First item - scroll to beginning
          targetScrollX = 0;
        } else if (activeIndex === customizations.length - 1) {
          // Last item - scroll to end
          targetScrollX = Math.max(0, totalScrollWidth - containerWidth);
        } else {
          // Middle items - center the active step
          targetScrollX = Math.max(
            0,
            activeStepPosition - containerWidth / 2 + STEP_ITEM_WIDTH / 2,
          );

          // Ensure we don't scroll past the end
          targetScrollX = Math.min(targetScrollX, totalScrollWidth - containerWidth);
        }

        scrollViewRef.current?.scrollTo({
          x: targetScrollX,
          animated: true,
        });
      };

      // Small delay to ensure the component has rendered
      const timeoutId = setTimeout(scrollToActiveStep, 100);
      return () => clearTimeout(timeoutId);
    }
  }, [activeIndex, customizations.length]);

  const activeCustomization = customizations[activeIndex];

  const handleNext = () => {
    if (activeIndex < customizations.length - 1) {
      setActiveIndex(activeIndex + 1);
    } else {
      // Add item to cart when customization is complete
      if (clothingItem) {
        const cartCustomizations: CartCustomization[] = Object.entries(selections).map(
          ([customizationId, optionId]) => {
            const customization = customizations.find((c) => c.id === customizationId);
            const option = customization?.options.find((o) => o.id === optionId);

            return {
              customizationId,
              optionId,
              name: customization?.name || 'Unknown',
              optionName: option?.name || 'Unknown',
              mediaUrl: option?.mediaUrl,
              priceModifier: option?.priceModifier || 0,
            };
          },
        );

        addItem(clothingItem, cartCustomizations);
      }

      // Navigate to Cart screen
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
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={styles.optionsContainer}
          showsVerticalScrollIndicator={false}
        >
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
              <Text style={styles.optionText}>{opt.title}</Text>
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
