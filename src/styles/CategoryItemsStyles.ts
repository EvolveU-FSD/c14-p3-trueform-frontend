import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get('window');
const SPACING = 16;
const CARD_WIDTH = (width - SPACING * 3) / 2;

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    gridContainer: {
        padding: SPACING,
    },
    columnWrapper: {
        justifyContent: 'space-between',
    },
    itemCard: {
        width: CARD_WIDTH,
        backgroundColor: '#fff',
        borderRadius: 12,
        marginBottom: SPACING,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        overflow: 'hidden',
    },
    imageContainer: {
        width: '100%',
        height: CARD_WIDTH * 1.2,
        backgroundColor: '#f5f5f5',
    },
    itemImage: {
        width: '100%',
        height: '100%',
    },
    itemContent: {
        padding: 12,
    },
    itemName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1a1a1a',
        marginBottom: 4,
    },
    itemDescription: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
        lineHeight: 18,
    },
    itemPrice: {
        fontSize: 18,
        fontWeight: '700',
        color: '#007b55',
    },
    emptyText: {
        textAlign: 'center',
        fontSize: 16,
        color: '#666',
        marginTop: 24,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    headerButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
    },
    headerButtonText: {
        fontSize: 16,
        marginRight: 4,
        color: '#333',
    },
    plusIcon: {
        fontSize: 18,
        color: '#333',
    },
    sortOptionsContainer: {
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        padding: 8,
    },
    sortOption: {
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    sortOptionActive: {
        backgroundColor: '#f5f5f5',
    },
    sortOptionText: {
        fontSize: 14,
        color: '#333',
    },
    content: {
        flex: 1,
        marginBottom: 60, // Space for bottom nav
      },
      bottomNav: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#eee',
      },
      navButton: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: '#4caf50',
        borderRadius: 8,
      },
      navButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '500',
      },
});
