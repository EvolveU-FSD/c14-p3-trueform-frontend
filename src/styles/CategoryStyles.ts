import { StyleSheet } from 'react-native';
import { Theme } from '../theme/ThemeContext';

export function createCategoryStyles(theme: Theme) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.backgroundColor,
    },
    headerContainer: {
      padding: 16,
      marginTop: 10,
    },
    categoryTitle: {
      fontSize: 28,
      fontWeight: 'bold',
      color: theme.textColor,
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 16,
      color: theme.secondaryColor,
    },
    placeholderContainer: {
      flex: 1,
      padding: 20,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 60,
    },
    placeholderText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.textColor,
      textAlign: 'center',
      marginBottom: 12,
    },
    placeholderSubtext: {
      fontSize: 16,
      color: theme.secondaryColor,
      textAlign: 'center',
    }
  });
};
