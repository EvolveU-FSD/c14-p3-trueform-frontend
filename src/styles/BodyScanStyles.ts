import { StyleSheet } from 'react-native';

export const bodyScanStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  formSection: {
    marginBottom: 24,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    backgroundColor: '#fff',
  },
  picker: {
    height: 50,
  },
  photoInstructions: {
    marginBottom: 16,
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
  photoSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  photoContainer: {
    width: '48%',
    alignItems: 'center',
  },
  photoLabel: {
    marginBottom: 8,
    fontSize: 14,
    fontWeight: 'bold',
  },
  placeholderImage: {
    width: '100%',
    height: 200,
    backgroundColor: '#eee',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  previewImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 8,
  },
  photoButton: {
    backgroundColor: '#ddd',
    padding: 8,
    borderRadius: 4,
    width: '100%',
    alignItems: 'center',
  },
  photoButtonText: {
    fontSize: 14,
  },
  submitButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 24,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultsSection: {
    marginBottom: 24,
    backgroundColor: '#f0f8ff',
    borderRadius: 8,
    padding: 16,
  },
  measurementRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  measurementLabel: {
    fontSize: 16,
  },
  measurementValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  // Add these to your bodyScanStyles object
  photoButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  halfWidthButton: {
    width: '48%', // Not quite half to allow for spacing
  },
});
