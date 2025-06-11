// src/components/HeroBanner.tsx
import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { HeroBannerProps } from '../types/product';
import { useTheme } from '../theme/ThemeContext';
import { createStyles } from '../styles/HeroBannerStyles';

export default function HeroBanner({ title, image, onPress }: HeroBannerProps) {
    const { theme } = useTheme();
    const styles = createStyles(theme);

    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
            <ImageBackground
                source={{ uri: image }}
                style={styles.banner}
                imageStyle={styles.bannerImage}
            >
                {/* Optional overlay for better text readability */}
                <View style={styles.overlay} />
                <Text style={styles.title}>{title}</Text>
            </ImageBackground>
        </TouchableOpacity>
    );
};
