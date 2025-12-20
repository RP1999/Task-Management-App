import React from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { colors } from '../styles/theme';
import styles from '../styles/BottomNav.styles';
import { useNavigation, useRoute } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const BottomNav = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const currentRoute = route.name;

  const isActive = (routeName) => currentRoute === routeName;

  const NavItem = ({ name, icon, label }) => (
    <TouchableOpacity 
      style={styles.navItem} 
      onPress={() => navigation.navigate(name)}
    >
      <Icon 
        name={icon} 
        size={24} 
        color={isActive(name) ? colors.primary : '#A0AEC0'} 
      />
      {isActive(name) && <View style={styles.activeDot} />}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.leftGroup}>
          <NavItem name="Home" icon="home" />
          <NavItem name="Schedule" icon="calendar" />
        </View>

        <View style={styles.centerSpace} />

        <View style={styles.rightGroup}>
          <NavItem name="Reports" icon="file-text" />
          <NavItem name="Profile" icon="user" />
        </View>
      </View>

      {/* Floating Action Button */}
      <TouchableOpacity 
        style={styles.fab}
        onPress={() => navigation.navigate('CreateEditTask')}
        activeOpacity={0.8}
      >
        <Icon name="plus" size={32} color={colors.white} />
      </TouchableOpacity>
    </View>
  );
};

export default BottomNav;

