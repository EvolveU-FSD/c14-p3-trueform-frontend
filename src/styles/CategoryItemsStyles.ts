import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get('window');
const ITEM_SPACING = 16;
const ITEMS_PER_ROW = 2;
const ITEM_WIDTH = (width - (ITEM_SPACING * (ITEMS_PER_ROW + 1))) / ITEMS_PER_ROW;

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    gridContainer: {
        padding: ITEM_SPACING,
    },
    columnWrapper: {
        justifyContent: 'space-between',
        marginBottom: ITEM_SPACING,
    },
    itemCard: {
        width: ITEM_WIDTH,
        backgroundColor: '#fff',
        borderRadius: 8,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    imageContainer: {
        width: '100%',
        aspectRatio: 1,
    },
    itemImage: {
        width: '100%',
        height: '100%',
    },
    itemContent: {
        padding: 8,
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
