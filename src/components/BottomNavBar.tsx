// src/components/BottomNavBar.tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { BottomNavBarProps } from '../types/product';
import { useTheme } from '../theme/ThemeContext';
import { createStyles } from '../styles/BottomNavBarStyles';
import { useNavigation } from '@react-navigation/native';

export default function BottomNavBar({ activeTab, onTabChange }: BottomNavBarProps) {
<<<<<<< HEAD
    const { theme } = useTheme();
    const styles = createStyles(theme);
    const navigation = useNavigation();

    const tabs = [
        { name: 'home', icon: '🏠', label: 'Home' },
        { name: 'discover', icon: '🔍', label: 'Discover' },
        { name: 'bodyscan', icon: '📏', label: 'Body Scan' },
        { name: 'cart', icon: '🛒', label: 'Cart' },
        { name: 'notifications', icon: '🔔', label: 'Alerts' },
        { name: 'profile', icon: '👤', label: 'Profile' },
    ];

    const handleTabPress = (tabName: string) => {
        if (tabName === 'bodyscan') {
            navigation.navigate('BodyScan' as never);
        } else {
            onTabChange(tabName);
        }
    };

    return (
        <View style={styles.container}>
            {tabs.map((tab) => (
                <TouchableOpacity
                    key={tab.name}
                    style={styles.tabButton}
                    onPress={() => handleTabPress(tab.name)}
                >
                    <Text style={[
                        styles.tabIcon,
                        activeTab === tab.name && styles.activeTabIcon
                    ]}>
                        {tab.icon}
                    </Text>
                    <Text style={[
                        styles.tabLabel,
                        activeTab === tab.name && styles.activeTabLabel
                    ]}>
                        {tab.label}
                    </Text>
                </TouchableOpacity>
            ))}
            
        </View>
    );
};
=======
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const tabs = [
    { name: 'home', icon: '🏠', label: 'Home' },
    { name: 'discover', icon: '🔍', label: 'Discover' },
    { name: 'cart', icon: '🛒', label: 'Cart' },
    { name: 'notifications', icon: '🔔', label: 'Alerts' },
    { name: 'profile', icon: '👤', label: 'Profile' },
  ];

  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.name}
          style={styles.tabButton}
          onPress={() => onTabChange(tab.name)}
        >
          <Text style={[styles.tabIcon, activeTab === tab.name && styles.activeTabIcon]}>
            {tab.icon}
          </Text>
          <Text style={[styles.tabLabel, activeTab === tab.name && styles.activeTabLabel]}>
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
>>>>>>> main
