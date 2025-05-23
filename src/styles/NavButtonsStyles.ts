// src/styles/NavButtonsStyles.ts
import { StyleSheet } from 'react-native';
import { Theme } from '../theme/ThemeContext';

export const createStyles = (theme: Theme) => StyleSheet.create({
    scrollContainer: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginBottom: 1,
        marginLeft: 1,
        backgroundColor: theme.backgroundColor,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: theme.borderColor, // Light background for buttons
        marginRight: 12,
    },
    activeButton: {
        backgroundColor: theme.primaryColor, // Primary color for active state
    },
    icon: {
        fontSize: 18,
        marginRight: 6,
        color: theme.textColor,
    },
    activeIcon: {
        color: '#FFFFFF', // White text for active button
    },
    label: {
        fontSize: 14,
        fontWeight: '500',
        color: theme.textColor,
    },
    activeLabel: {
        color: '#FFFFFF', // White text for active button
    },
});