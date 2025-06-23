// src/components/NavButtons.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { NavButtonProps } from '../types/product';
import { useTheme } from '../theme/ThemeContext';
import createStyles from '../styles/NavButtonsStyles';

function NavButton({ icon, label, onPress, isActive }: NavButtonProps) {
  const styles = createStyles();

  return (
    <TouchableOpacity style={[styles.button, isActive && styles.activeButton]} onPress={onPress}>
      {icon}
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

export default function NavButtons() {
  const styles = createStyles();
  const [activeButton, setActiveButton] = useState<string | null>(null);

  const handleButtonPress = (buttonName: string) => {
    setActiveButton(buttonName);
    console.log(`${buttonName} pressed`);
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContainer}
    >
      <NavButton
        icon={<Text>♥</Text>}
        label='Favorites'
        onPress={() => handleButtonPress('Favorites')}
        isActive={activeButton === 'Favorites'}
      />
      <NavButton
        icon={<Text>⏱</Text>}
        label='History'
        onPress={() => handleButtonPress('History')}
        isActive={activeButton === 'History'}
      />
      <NavButton
        icon={<Text>👥</Text>}
        label='Following'
        onPress={() => handleButtonPress('Following')}
        isActive={activeButton === 'Following'}
      />
      <NavButton
        icon={<Text>≡</Text>}
        label='Menu'
        onPress={() => handleButtonPress('Menu')}
        isActive={activeButton === 'Menu'}
      />
    </ScrollView>
  );
}
