import { StyleSheet, Dimensions } from "react-native";

const screenWidth = Dimensions.get('window').width;


export const styles = StyleSheet.create({
    container: { alignItems: 'center', padding: 20 },
    imageGallery: { width: screenWidth, height: 260, marginBottom: 10 },
    image: { width: screenWidth - 40, height: 220, borderRadius: 12, marginHorizontal: 10, backgroundColor: '#eee' },
    imageIndicatorContainer: { flexDirection: 'row', justifyContent: 'center', marginBottom: 8 },
    imageIndicator: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#bbb', margin: 3 },
    name: { fontSize: 22, fontWeight: 'bold', marginBottom: 8 },
    price: { fontSize: 18, color: '#007b55', fontWeight: 'bold', marginBottom: 8 },
    desc: { fontSize: 16, color: '#444', marginBottom: 12, textAlign: 'center' },
    metaContainer: { marginTop: 8, width: '100%' },
    meta: { fontSize: 15, color: '#666', marginBottom: 4 },
    notFound: { fontSize: 18, color: 'red', marginTop: 40 },
    cartBtn: {
        marginTop: 24,
        backgroundColor: '#4caf50', // Updated to match HomeScreen button color
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 32,
        alignItems: 'center'
    },
    cartBtnText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold'
    },
    customSection: { width: '100%', marginTop: 20, marginBottom: 8, backgroundColor: '#f8f8f8', borderRadius: 8, padding: 12 },

    customRow: { marginBottom: 10 },
    customLabel: { fontSize: 15, color: '#333', marginBottom: 4 },
    customOptionBtn: { paddingVertical: 6, paddingHorizontal: 12, borderRadius: 16, backgroundColor: '#eee', marginRight: 8 },
    customOptionBtnActive: { backgroundColor: '#007b55' },
    customOptionText: { color: '#333' },
    customOptionTextActive: { color: '#fff', fontWeight: 'bold' },
    customHint: { color: '#007bff', marginTop: 8, fontSize: 14 },
    fabricSection: {
        width: '100%',
        marginTop: 12,
        marginBottom: 8,
        backgroundColor: '#f3f3f3',
        borderRadius: 8,
        padding: 12
    },
    fabricTitle: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 4,
        color: '#222'
    },
    fabricDetail: {
        fontSize: 15,
        color: '#444'
    },
    collapseHeader: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingHorizontal: 4,
        backgroundColor: '#f3f3f3',
        borderRadius: 8,
        marginTop: 12
    },
    collapseHeaderText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#222'
    },
    collapseHeaderIcon: {
        fontSize: 18,
        color: '#888'
    },
});
