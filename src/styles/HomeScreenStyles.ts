import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  menuButton: {
    padding: 8,
  },
  menuIcon: {
    fontSize: 24,
  },
  headerCenter: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  headerRight: {
    flexDirection: 'row',
  },
  iconButton: {
    padding: 8,
    marginLeft: 8,
  },
  icon: {
    fontSize: 24,
  },
  bannerContainer: {
    width: '100%',
    height: 400,
    position: 'relative',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  startShoppingButton: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    backgroundColor: '#007b55',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  startShoppingText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default styles;
