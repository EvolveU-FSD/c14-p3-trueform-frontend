// src/styles/HeroBannerStyles.ts
import { StyleSheet } from 'react-native';
import { Theme } from '../theme/ThemeContext';

export function createStyles(theme: Theme) {
    return StyleSheet.create({
        banner: {
            height: 200,
            marginHorizontal: 16,
            marginVertical: 12,
            justifyContent: 'center',
            paddingLeft: 20,
            backgroundColor: theme.backgroundColor,
        },
        bannerImage: {
            borderRadius: 12,
        },
        title: {
            fontSize: 28,
            fontWeight: 'bold',
            color: theme.textColor,
            width: '60%',
            // Optional: add a text shadow for better readability on varied backgrounds
            textShadowColor: 'rgba(0, 0, 0, 0.3)',
            textShadowOffset: { width: 1, height: 1 },
            textShadowRadius: 3,
        },
        overlay: {
            ...StyleSheet.absoluteFillObject,
            borderRadius: 12,
        },
    })
};