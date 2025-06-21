// src/components/HeroBanner.tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { HeroBannerProps } from '../types/product';
import createStyles from '../styles/HeroBannerStyles';
import { CrossImageBackground } from './CrossImage';

export default function HeroBanner({ title, image, onPress }: HeroBannerProps) {
  const styles = createStyles();

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <CrossImageBackground source={image} style={styles.banner} imageStyle={styles.bannerImage}>
        {/* Optional overlay for better text readability */}
        <View style={styles.overlay} />
        <Text style={styles.title}>{title}</Text>
      </CrossImageBackground>
    </TouchableOpacity>
  );
}
