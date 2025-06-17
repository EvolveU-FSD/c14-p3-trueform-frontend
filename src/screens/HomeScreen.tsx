// src/screens/HomeScreen.tsx
import React, { useState } from 'react';
import { View, ScrollView, SafeAreaView, StyleSheet, StatusBar, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { FontAwesome5 } from '@expo/vector-icons';

const heroBannerImage = require('../../assets/images/banners/hero-banner.jpg');

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export default function HomeScreen() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);  // Add this state
    const navigation = useNavigation<HomeScreenNavigationProp>();

    const handleCategorySelect = (category: string) => {
        navigation.navigate('Category', { slug: category.toLowerCase() });
        setIsMenuOpen(false);
    };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle='dark-content' />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity 
                    style={styles.menuButton}
                    onPress={() => setIsMenuOpen(!isMenuOpen)}
                >
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
                                <Text style={styles.menuItemText}>
                                    Shirt Category {isSubmenuOpen ? '-' : '+'}
                                </Text>
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
                                <FontAwesome5 name="facebook" size={20} color="#1877F2" />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.socialIcon}>
                                <FontAwesome5 name="instagram" size={20} color="#E4405F" />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.socialIcon}>
                                <FontAwesome5 name="linkedin" size={20} color="#0A66C2" />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.socialIcon}>
                                <FontAwesome5 name="youtube" size={20} color="#FF0000" />
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
                        <FontAwesome5 name="shopping-cart" size={20} color="#333" />
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView>
                <View style={styles.headerTitleContainer}>
                    <Text style={styles.mainTitle}>True Form Tailors</Text>
                    <Text style={styles.mainSubtitle}>Custom Made Shirts</Text>
                </View>

                <View style={styles.bannerContainer}>
                    <Image 
                        source={heroBannerImage}
                        style={styles.bannerImage}
                        resizeMode="cover"
                    />
                </View>
                
                <TouchableOpacity 
                    style={styles.startShoppingButton}
                    onPress={() => navigation.navigate('Category', { slug: '1' })}
                >
                    <Text style={styles.startShoppingText}>Start Shopping</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        backgroundColor: '#fff',
        zIndex: 1000, // Add this
        elevation: 1000, // Add this for Android
    },
    menuButton: {
        padding: 8,
    },
    menuIcon: {
        fontSize: 24,
    },
    headerRight: {
        flexDirection: 'row',
    },
    loginButton: {
        padding: 8,
        marginLeft: 8,
    },
    loginText: {
        fontSize: 16,
        color: '#333',
        fontWeight: '500',
    },
    iconButton: {
        padding: 8,
        marginLeft: 8,
    },
    icon: {
        fontSize: 24,
    },
    bannerContainer: {
        width: '100%',
        height: 400,
        padding: 10,
        marginBottom: 20,  // Added margin bottom
    },
    bannerImage: {
        width: '100%',
        height: '100%',
        borderRadius: 8,  // Optional: add rounded corners to match padding
    },
    startShoppingButton: {
        backgroundColor: '#4caf50',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        marginHorizontal: 20,
        marginBottom: 30,  // Added margin bottom
        alignItems: 'center',
    },
    startShoppingText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    dropdown: {
        position: 'absolute',
        top: 60,
        left: 16,
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 8,
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
        elevation: 5, // Keep elevation for Android
        zIndex: 1000,
        minWidth: 200,
        borderWidth: 1,
        borderColor: '#eee',
    },
    menuItem: {
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    menuItemText: {
        fontSize: 14,
        color: '#333',
        padding: 12,  // Match padding with other menu items
    },
    categoryHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 0,  // Remove extra padding
    },
    submenu: {
        marginLeft: 16,
        backgroundColor: '#fff',
    },
    submenuItem: {
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    socialContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 16,
        borderTopWidth: 1,
        borderTopColor: '#eee',
        marginTop: 8,
    },
    socialIcon: {
        padding: 12,
        borderRadius: 20,
        backgroundColor: '#f5f5f5',
    },
    headerTitleContainer: {
        alignItems: 'center',
        paddingVertical: 24,  // Increased padding
        marginBottom: 10,  // Added margin bottom
    },
    mainTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    mainSubtitle: {
        fontSize: 16,
        color: '#666',
        marginTop: 4,
    },
});
