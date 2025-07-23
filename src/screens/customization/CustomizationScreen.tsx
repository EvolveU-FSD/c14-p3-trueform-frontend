import React, { useEffect, useState, useRef } from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CustomizationProvider, useCustomization } from '../../context/CustomizationContext';
import { CustomizationService } from '../../services/customization.service';
import { useRoute, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import createStyles from '../../styles/CustomizationScreenStyles';
import { ClothingService } from '../../services/clothing.service';
import { useCart } from '../../context/CartContext';
import { Clothing } from '../../types/clothing';
import { CartCustomization } from '../../types/context/cart.types';
import { getImageUrl } from '../../utils/imageHandling';
import { Customization } from '../../types/customization';
import { Selection } from '../../types/context/customization.types';

const { width: screenWidth } = Dimensions.get('window');

type CustomizationScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Customization'
>;

// Helper to filter customizations based on conditionalOn and current selections
function filterCustomizations(customizations: any[], selections: { [key: string]: string }) {
  // Find the sleeve customization and the short sleeve option id
  const sleeveCustomization = customizations.find(
    (c) => c.name.toLowerCase() === 'sleeve'
  );
  let shortSleeveOptionId = undefined;
  if (sleeveCustomization) {
    const shortSleeveOption = sleeveCustomization.options.find(
      (opt: any) => opt.name.toLowerCase().includes('short')
    );
    if (shortSleeveOption) {
      shortSleeveOptionId = shortSleeveOption.id;
    }
  }

  return customizations.filter((c) => {
    if (!c.conditionalOn) return true;
    // Only supporting { not: { sleeve: 'shortSleeve' } } for now
    if (c.conditionalOn.not && c.conditionalOn.not.sleeve) {
      // Use the actual sleeve customization id and short sleeve option id
      if (sleeveCustomization && shortSleeveOptionId) {
        return selections[sleeveCustomization.id] !== shortSleeveOptionId;
      }
    }
    return true;
  });
}

export default function CustomizationScreen() {
  const styles = createStyles();
  const route = useRoute<any>();
  const navigation = useNavigation<CustomizationScreenNavigationProp>();
  const { itemId } = route.params;

  const { selections, handleSelection } = useCustomization();
  const { addItem } = useCart();
  const [customizations, setCustomizations] = useState<Customization[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [clothingItem, setClothingItem] = useState<Clothing | null>(null);
  const scrollViewRef = useRef<ScrollView>(null);
  const [hasInitializedSelections, setHasInitializedSelections] = useState(false);

  // Constants for scroll calculation
  const STEP_ITEM_WIDTH = 80; // Approximate width of each step item including margins
  const CONTAINER_PADDING = 16; // Horizontal padding of stepsContainer

  // Set up navigation options
  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: 'Customization',
      headerShadowVisible: true,
      headerBackTitle: 'Item Details',
      headerBackVisible: true,
    });
  }, [navigation]);

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
    if (clothingItem && !hasInitializedSelections) {
      (async () => {
        const response = await CustomizationService.getCustomizationsByCategoryId(
          clothingItem.categoryId,
        );
        setCustomizations(response);

        // Auto-select the default option for each customization based on API response
        const initialSelections: Selection = {};
        response.forEach((customization: Customization) => {
          if (customization.options && customization.options.length > 0) {
            const defaultOptionId = customization.defaultValue || customization.options[0].id;
            const defaultOptionExists = customization.options.some(
              (opt) => opt.id === defaultOptionId,
            );
            if (defaultOptionExists) {
              initialSelections[customization.id] = defaultOptionId;
            } else {
              initialSelections[customization.id] = customization.options[0].id;
            }
          }
        });

        Object.entries(initialSelections).forEach(([customizationId, optionId]) => {
          handleSelection(customizationId, optionId);
        });

        setHasInitializedSelections(true); // Only run this once per item
      })();
    }
  }, [clothingItem, hasInitializedSelections, handleSelection]);

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

  // Instead of using customizations directly, use filteredCustomizations
  const filteredCustomizations = filterCustomizations(customizations, selections);
  const activeCustomization = filteredCustomizations[activeIndex];

  const handleNext = () => {
    if (activeIndex < filteredCustomizations.length - 1) {
      setActiveIndex(activeIndex + 1);
    } else {
      // Add item to cart when customization is complete
      if (clothingItem) {
        // Only include selections for customizations that are actually shown
        const filteredIds = filteredCustomizations.map(c => c.id);
        const cartCustomizations: CartCustomization[] = filteredIds
          .filter(customizationId => selections[customizationId])
          .map(customizationId => {
            const customization = customizations.find((c) => c.id === customizationId);
            const optionId = selections[customizationId];
            const option = customization?.options.find((o) => o.id === optionId);
            return {
              customizationId,
              optionId,
              name: customization?.name || 'Unknown',
              optionName: option?.name || 'Unknown',
              mediaUrl: option?.mediaUrl,
              priceModifier: option?.priceModifier || 0,
            };
          });

        addItem(clothingItem, cartCustomizations);
      }

      // Navigate back to Main (BottomTabNavigator) and then to Cart tab
      navigation.navigate('Main', { screen: 'Cart' });
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
  const isLastStep = activeIndex === filteredCustomizations.length - 1;

  // Check if current step has a selection
  const hasCurrentSelection = activeCustomization && selections[activeCustomization.id];
  const isNextDisabled = !hasCurrentSelection;

  return (
    <CustomizationProvider>
      <SafeAreaView style={styles.container} edges={[]}>
        <StatusBar barStyle='dark-content' />
        <View style={{ flex: 1 }}>
          {/* Top Nav */}
          <ScrollView
            ref={scrollViewRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.stepsContainer}
            contentContainerStyle={styles.stepsContentContainer}
          >
            {filteredCustomizations.map((c, idx) => (
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
            {activeCustomization?.options.map((opt) => (
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
              {activeIndex + 1} of {filteredCustomizations.length}
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
      </SafeAreaView>
    </CustomizationProvider>
  );
}
