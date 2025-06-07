// src/styles/SearchBarStyles.ts
import { StyleSheet } from 'react-native';
import { Theme } from '../theme/ThemeContext';

export function createStyles(theme: Theme) {
    return StyleSheet.create({
        container: {
            marginVertical: 10,
            paddingHorizontal: 16,
        },
        input: {
            backgroundColor: theme.borderColor, // Light background for input field
            color: theme.textColor,
            borderRadius: 8,
            padding: 10,
            fontSize: 16,
            // Optional shadow for better definition in light mode
            shadowColor: theme.isDarkMode ? 'transparent' : 'rgba(0, 0, 0, 0.1)',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.2,
            shadowRadius: 2,
            elevation: theme.isDarkMode ? 0 : 2,
        },
    });
};