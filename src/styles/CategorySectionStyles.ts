// src/styles/CategorySectionStyles.ts
import { StyleSheet } from 'react-native';
import { Theme } from '../theme/ThemeContext';

export const createStyles = (theme: Theme) => StyleSheet.create({
    container: {
        marginVertical: 12,
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
    categoriesContainer: {
        paddingHorizontal: 16,
    },
    categoryItem: {
        alignItems: 'center',
        marginRight: 16,
        width: 80,
    },
    imageContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: theme.borderColor,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
        overflow: 'hidden',
    },
    categoryImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    categoryName: {
        fontSize: 14,
        textAlign: 'center',
        color: theme.textColor,
    },
});