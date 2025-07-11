import React from 'react';
import { View, Text, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import createStyles from '../styles/NavigationBarStyles';

interface NavigationState {
  isMenuOpen: boolean;
  isSubmenuOpen: boolean;
  isAccountMenuOpen: boolean;
}

interface NavigationBarProps {
  navigation: any;
  navState: NavigationState;
  setNavState: React.Dispatch<React.SetStateAction<NavigationState>>;
}

export default function NavigationBar({ navigation, navState, setNavState }: NavigationBarProps) {
  const styles = createStyles();
  const { isAuthenticated, logout } = useAuth();
  const { isMenuOpen, isSubmenuOpen, isAccountMenuOpen } = navState;

  const handleCategorySelect = (category: string) => {
    console.log(`Selected category: ${category}`);
    setNavState((prev) => ({ ...prev, isMenuOpen: false, isSubmenuOpen: false }));
  };

  const handleLogout = async () => {
    try {
      await logout();
      setNavState((prev) => ({ ...prev, isAccountMenuOpen: false }));
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.menuButton}
        onPress={() => setNavState((prev) => ({ ...prev, isMenuOpen: !prev.isMenuOpen }))}
      >
        <Text style={styles.menuIcon}>☰</Text>
      </TouchableOpacity>

      {/* Dropdown Menu */}
      {isMenuOpen && (
        <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
          <View style={styles.dropdown}>
            {/* Shirt Category Menu Item */}
            <View style={styles.menuItem}>
              <TouchableOpacity
                style={styles.categoryHeader}
                onPress={() =>
                  setNavState((prev) => ({ ...prev, isSubmenuOpen: !prev.isSubmenuOpen }))
                }
              >
                <Text style={styles.menuItemText}>Shirt Category {isSubmenuOpen ? '-' : '+'}</Text>
              </TouchableOpacity>
              {isSubmenuOpen && (
                <View style={styles.submenu}>
                  <TouchableOpacity
                    style={styles.submenuItem}
                    onPress={() => handleCategorySelect('casual')}
                  >
                    <Text>Casual</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.submenuItem}
                    onPress={() => handleCategorySelect('work')}
                  >
                    <Text>Work</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.submenuItem}
                    onPress={() => handleCategorySelect('party')}
                  >
                    <Text>Party</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>

            {/* Additional Menu Items */}
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuItemText}>About True Form Tailors</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuItemText}>Contact Us</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuItemText}>FAQ</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuItemText}>Why True Form Tailor</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuItemText}>Reviews</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuItemText}>How It Works</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuItemText}>Quality</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuItemText}>Fit Guarantee</Text>
            </TouchableOpacity>

            {/* Social Media Icons */}
            <View style={styles.socialContainer}>
              <TouchableOpacity style={styles.socialIcon}>
                <FontAwesome5 name='facebook' size={20} color='#1877F2' />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialIcon}>
                <FontAwesome5 name='instagram' size={20} color='#E4405F' />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialIcon}>
                <FontAwesome5 name='linkedin' size={20} color='#0A66C2' />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialIcon}>
                <FontAwesome5 name='youtube' size={20} color='#FF0000' />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      )}

      <View style={styles.headerRight}>
        {isAuthenticated ? (
          <View style={styles.accountContainer}>
            <TouchableOpacity
              style={styles.accountButton}
              onPress={() =>
                setNavState((prev) => ({ ...prev, isAccountMenuOpen: !prev.isAccountMenuOpen }))
              }
            >
              <FontAwesome5 name='user-circle' size={20} color='#333' />
            </TouchableOpacity>

            {/* Account dropdown menu */}
            {isAccountMenuOpen && (
              <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
                <View style={styles.accountDropdown}>
                  <TouchableOpacity style={styles.accountMenuItem} onPress={handleLogout}>
                    <Text style={styles.accountMenuText}>Logout</Text>
                  </TouchableOpacity>
                </View>
              </TouchableWithoutFeedback>
            )}
          </View>
        ) : (
          <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Cart')}>
          <FontAwesome5 name='shopping-cart' size={20} color='#333' />
        </TouchableOpacity>
      </View>
    </View>
  );
}
