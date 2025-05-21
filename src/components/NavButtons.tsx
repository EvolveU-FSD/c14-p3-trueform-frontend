// src/components/NavButtons.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { NavButtonProps } from '../types/product';

const NavButton: React.FC<NavButtonProps> = ({ icon, label, onPress, isActive }) => {
    return (
        <TouchableOpacity
            style={[styles.button, isActive && styles.activeButton]}
            onPress={onPress}
        >
            {icon}
            <Text style={styles.label}>{label}</Text>
        </TouchableOpacity>
    );
};

const NavButtons: React.FC = () => {
    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollContainer}
        >
            <NavButton
                icon={<Text style={styles.icon}>♥</Text>}
                label="Favorites"
                onPress={() => console.log('Favorites pressed')}
            />
            <NavButton
                icon={<Text style={styles.icon}>⏱</Text>}
                label="History"
                onPress={() => console.log('History pressed')}
            />
            <NavButton
                icon={<Text style={styles.icon}>👥</Text>}
                label="Following"
                onPress={() => console.log('Following pressed')}
            />
            <NavButton
                icon={<Text style={styles.icon}>≡</Text>}
                label="Menu"
                onPress={() => console.log('Menu pressed')}
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginBottom: 1,
        marginLeft: 1,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: '#f5f5f5',
        marginRight: 12, // Added spacing between buttons
    },
    activeButton: {
        backgroundColor: '#e0e0e0',
    },
    icon: {
        fontSize: 18,
        marginRight: 6,
    },
    label: {
        fontSize: 14,
        fontWeight: '500',
    },
});

export default NavButtons;