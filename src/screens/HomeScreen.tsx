// src/screens/HomeScreen.tsx
import React, { useState } from 'react';
import {
  View,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import createStyles from '../styles/HomeScreenStyles';
import NavigationBar from '../components/NavigationBar';
import { createBackdropHandler } from '../utils/dropdownUtils';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const heroBannerImage = require('../../assets/images/banners/hero-banner.jpg');

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

export default function HomeScreen({ navigation }: Props) {
  const styles = createStyles();
  const [navState, setNavState] = useState({
    isMenuOpen: false,
    isSubmenuOpen: false,
    isAccountMenuOpen: false,
  });

  // Create backdrop handler for navigation dropdowns
  const handleBackdropPress = createBackdropHandler([
    {
      isOpen: navState.isMenuOpen,
      setIsOpen: (value) => setNavState((prev) => ({ ...prev, isMenuOpen: value })),
    },
    {
      isOpen: navState.isSubmenuOpen,
      setIsOpen: (value) => setNavState((prev) => ({ ...prev, isSubmenuOpen: value })),
    },
    {
      isOpen: navState.isAccountMenuOpen,
      setIsOpen: (value) => setNavState((prev) => ({ ...prev, isAccountMenuOpen: value })),
    },
  ]);

  return (
    <TouchableWithoutFeedback onPress={handleBackdropPress}>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle='dark-content' />

        {/* Navigation Bar */}
        <NavigationBar navigation={navigation} navState={navState} setNavState={setNavState} />

        <ScrollView>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.mainTitle}>True Form Tailors</Text>
            <Text style={styles.mainSubtitle}>Custom Made Shirts</Text>
          </View>

          <View style={styles.bannerContainer}>
            <Image source={heroBannerImage} style={styles.bannerImage} resizeMode='cover' />
          </View>

          <TouchableOpacity
            style={styles.startShoppingButton}
            onPress={() => navigation.navigate('Items', { slug: 'all' })}
          >
            <Text style={styles.startShoppingText}>Start Shopping</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.startShoppingButton}
            onPress={() => navigation.navigate('BodyScan')}
          >
            <Text style={styles.startShoppingText}>Open Body Scan</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
