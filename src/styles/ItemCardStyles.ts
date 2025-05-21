// src/styles/ItemCardStyles.ts
import { StyleSheet } from 'react-native';
import { Theme } from '../theme/ThemeContext';

export const createStyles = (theme: Theme) => StyleSheet.create({
    container: {
        width: 150,
        marginRight: 15,
        backgroundColor: theme.backgroundColor,
    },
    image: {
        width: '100%',
        height: 180,
        borderRadius: 8,
        backgroundColor: theme.borderColor, // Placeholder background
    },
    detailsContainer: {
        marginTop: 8,
    },
    category: {
        fontSize: 14,
        color: theme.secondaryColor,
        marginBottom: 2,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
        color: theme.textColor,
    },
    price: {
        fontSize: 16,
        fontWeight: '600',
        color: theme.primaryColor,
    },
});