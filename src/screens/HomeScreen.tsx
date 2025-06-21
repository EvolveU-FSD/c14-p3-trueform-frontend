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
} from 'react-native';
import { HomeScreenProps } from '../types/navigation';
import { FontAwesome5 } from '@expo/vector-icons';
import createStyles from '../styles/HomeScreenStyles';

const heroBannerImage = require('../../assets/images/banners/hero-banner.jpg');

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const styles = createStyles();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false); // Add this state


  const handleCategorySelect = (category: string) => {
    navigation.navigate('Category', { slug: category.toLowerCase() });
    setIsMenuOpen(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle='dark-content' />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton} onPress={() => setIsMenuOpen(!isMenuOpen)}>
          <Text style={styles.menuIcon}>☰</Text>
        </TouchableOpacity>

        {/* Dropdown Menu - simplified */}
        {isMenuOpen && (
          <View style={styles.dropdown}>
            {/* Shirt Category Menu Item */}
            <View style={styles.menuItem}>
              <TouchableOpacity
                style={styles.categoryHeader}
                onPress={() => setIsSubmenuOpen(!isSubmenuOpen)}
              >
                <Text style={styles.menuItemText}>Shirt Category {isSubmenuOpen ? '-' : '+'}</Text>
              </TouchableOpacity>
              {isSubmenuOpen && (
                <View style={styles.submenu}>
                  <TouchableOpacity
                    style={styles.submenuItem}
                    onPress={() => handleCategorySelect('casual')}
                  >
                    <Text>Casual</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.submenuItem}
                    onPress={() => handleCategorySelect('work')}
                  >
                    <Text>Work</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.submenuItem}
                    onPress={() => handleCategorySelect('party')}
                  >
                    <Text>Party</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>

            {/* Additional Menu Items */}
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuItemText}>About True Form Tailors</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuItemText}>Contact Us</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuItemText}>FAQ</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuItemText}>Why True Form Tailor</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuItemText}>Reviews</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuItemText}>How It Works</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuItemText}>Quality</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuItemText}>Fit Guarantee</Text>
            </TouchableOpacity>

            {/* Social Media Icons */}
            <View style={styles.socialContainer}>
              <TouchableOpacity style={styles.socialIcon}>
                <FontAwesome5 name='facebook' size={20} color='#1877F2' />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialIcon}>
                <FontAwesome5 name='instagram' size={20} color='#E4405F' />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialIcon}>
                <FontAwesome5 name='linkedin' size={20} color='#0A66C2' />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialIcon}>
                <FontAwesome5 name='youtube' size={20} color='#FF0000' />
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Remove headerCenter View completely */}

        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.loginButton}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <FontAwesome5 name='shopping-cart' size={20} color='#333' />
          </TouchableOpacity>
        </View>
      </View>

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
      </ScrollView>
    </SafeAreaView>
  );
}
