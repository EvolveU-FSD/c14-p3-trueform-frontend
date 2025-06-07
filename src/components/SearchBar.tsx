// src/components/SearchBar.tsx
import React, { useState } from 'react';
import { View, TextInput } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { createStyles } from '../styles/SearchBarStyles';

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
}

export default function SearchBar({
  placeholder = 'Search...',
  onSearch
}: SearchBarProps) {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const [query, setQuery] = useState('');

  // Handle search input
  const handleSearch = (text: string) => {
    setQuery(text);
    if (onSearch) {
      onSearch(text);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={theme.secondaryColor} // Use secondary color for placeholder
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
