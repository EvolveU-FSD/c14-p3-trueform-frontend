import { StyleSheet } from 'react-native';

export function createStyles() {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    tabBar: {
      elevation: 0,
      shadowOpacity: 0,
      backgroundColor: '#f8f8f8',
    },
    tabItem: {
      width: 'auto',
      paddingHorizontal: 16,
    },
  });
}
