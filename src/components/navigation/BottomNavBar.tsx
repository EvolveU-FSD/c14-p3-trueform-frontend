import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import createStyles from '../../styles/BottomNavBarStyles';
import { useNavigation } from '@react-navigation/native';
import { useNavigation as useNavigationContext } from '../../context/NavigationContext';

export default function BottomNavBar() {
  const navigation = useNavigation();
  const { activeTab, setActiveTab } = useNavigationContext();
  const styles = createStyles();

  const tabs = [
    { name: 'shop', icon: '🛍️', label: 'Shop' },
    { name: 'measure', icon: '📏', label: 'Measure' },
    { name: 'cart', icon: '🛒', label: 'Cart' },
    { name: 'account', icon: '👤', label: 'Account' },
  ];

  const handleTabPress = (tabName: string) => {
    setActiveTab(tabName);

    if (tabName === 'measure') {
      navigation.navigate('BodyScan' as never);
    } else if (tabName === 'cart') {
      navigation.navigate('Cart' as never);
    } else if (tabName === 'shop') {
      navigation.navigate('Items', { slug: 'all' } as never);
    } else if (tabName === 'account') {
      navigation.navigate('Login' as never);
    }
  };

  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.name}
          style={styles.tabButton}
          onPress={() => handleTabPress(tab.name)}
        >
          <Text style={[styles.tabIcon, activeTab === tab.name && styles.activeTabIcon]}>
            {tab.icon}
          </Text>
          <Text style={[styles.tabLabel, activeTab === tab.name && styles.activeTabLabel]}>
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
