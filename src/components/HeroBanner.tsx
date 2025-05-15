// src/components/HeroBanner.tsx
import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { HeroBannerProps } from '../types/product';

const HeroBanner: React.FC<HeroBannerProps> = ({ title, image, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
            <ImageBackground
                source={{ uri: image }}
                style={styles.banner}
                imageStyle={styles.bannerImage}
            >
                <Text style={styles.title}>{title}</Text>
            </ImageBackground>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    banner: {
        height: 200,
        marginHorizontal: 16,
        marginVertical: 12,
        justifyContent: 'center',
        paddingLeft: 20,
    },
    bannerImage: {
        borderRadius: 12,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#000',
        width: '60%',
    },
});

export default HeroBanner;