// src/styles/BottomNavBarStyles.ts
import { StyleSheet } from 'react-native';
import { Theme } from '../theme/ThemeContext'; // Make sure to export Theme interface

export const createStyles = (theme: Theme) => StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: theme.backgroundColor,
        borderTopWidth: 1,
        borderTopColor: theme.borderColor,
        paddingVertical: 8,
        paddingHorizontal: 4,
    },
    tabButton: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 8,
    },
    tabIcon: {
        fontSize: 24,
        marginBottom: 2,
        color: theme.iconColorInactive,
    },
    activeTabIcon: {
        color: theme.iconColorActive,
    },
    tabLabel: {
        fontSize: 12,
        color: theme.iconColorInactive,
    },
    activeTabLabel: {
        color: theme.iconColorActive,
        fontWeight: '500',
    },
});