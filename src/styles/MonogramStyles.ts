import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    padding: 16,
    paddingBottom: 8,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    gap: 16,
  },
  gridItem: {
    width: '47%',
    height: 50, // Reduced from 80 to 50
    backgroundColor: '#4A3419',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12, // Reduced from 16 to 12
    borderRadius: 4,
  },
  selectedItem: {
    backgroundColor: '#8B6B43',
  },
  itemText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});
