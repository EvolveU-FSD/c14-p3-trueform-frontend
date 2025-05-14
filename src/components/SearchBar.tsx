import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

interface SearchBarProps {
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder = 'Search...' }) => {
  const [query, setQuery] = useState('');

  // In the future, you can use this function to trigger search logic
  const handleSearch = (text: string) => {
    setQuery(text);
    // TODO: Add search logic here (e.g., API call or filtering)
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={query}
        onChangeText={handleSearch}
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="search"
        clearButtonMode="while-editing"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    paddingHorizontal: 16,
  },
  input: {
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
  },
});

export default SearchBar;
