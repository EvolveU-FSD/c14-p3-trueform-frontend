// src/components/BottomNavBar.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { BottomNavBarProps } from '../types/product';

const BottomNavBar: React.FC<BottomNavBarProps> = ({ activeTab, onTabChange }) => {
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

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#eee',
        paddingVertical: 8,
        paddingHorizontal: 4,
    },
    tabButton: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 8,
    },
    tabIcon: {
        fontSize: 24,
        marginBottom: 2,
        color: '#888',
    },
    activeTabIcon: {
        color: '#000',
    },
    tabLabel: {
        fontSize: 12,
        color: '#888',
    },
    activeTabLabel: {
        color: '#000',
        fontWeight: '500',
    },
});

export default BottomNavBar;