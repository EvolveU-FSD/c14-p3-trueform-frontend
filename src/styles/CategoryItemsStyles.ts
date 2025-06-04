import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        marginVertical: 16,
        paddingHorizontal: 20
    },
    filterSortRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
    filters: { flexDirection: 'row', marginRight: 12 },
    filterBtn: { padding: 6, marginRight: 6, borderRadius: 6, backgroundColor: '#eee' },
    filterBtnActive: { backgroundColor: '#333' },
    filterText: { color: '#333' },
    filterTextActive: { color: '#fff' },
    filterRow: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 8, alignItems: 'center' },
    pickerContainer: { minWidth: 120, flex: 1, maxWidth: 180, marginRight: 12, justifyContent: 'center' },
    picker: { height: 36, width: '100%' },
    sorts: { flexDirection: 'row', marginLeft: 12 },
    sortBtn: { padding: 6, marginLeft: 8, borderRadius: 8, backgroundColor: '#eee' },
    sortBtnActive: { backgroundColor: '#333' },
    sortText: { color: '#333' },
    sortTextActive: { color: '#fff' },
    columnWrapper: { justifyContent: 'space-between' },
    itemCard: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        marginBottom: 8,
        marginHorizontal: 4,
        backgroundColor: '#fafafa',
        borderRadius: 8,
        elevation: 1,
        minWidth: 0 
    },
    itemImage: { width: 64, height: 64, borderRadius: 8, backgroundColor: '#ddd' },
    itemName: { fontWeight: 'bold', fontSize: 16 },
    itemDesc: { color: '#666', marginVertical: 2 },
    itemPrice: { color: '#007b55', fontWeight: 'bold' },
    itemMeta: { color: '#888', fontSize: 12, marginTop: 2 },
    emptyText: { textAlign: 'center', color: '#aaa', marginTop: 20 }
});
