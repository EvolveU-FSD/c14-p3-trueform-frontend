// src/styles/FeaturedItemsStyles.ts
import { StyleSheet } from 'react-native';
import { Theme } from '../theme/ThemeContext';

export const createStyles = (theme: Theme) => StyleSheet.create({
    container: {
        marginVertical: 16,
        backgroundColor: theme.backgroundColor,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginBottom: 12,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: theme.textColor,
    },
    seeAll: {
        fontSize: 14,
        color: theme.secondaryColor,
    },
    scrollContent: {
        paddingHorizontal: 16,
        paddingBottom: 8,
    },
});