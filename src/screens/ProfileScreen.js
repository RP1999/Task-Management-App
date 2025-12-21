import React from 'react';
import styles from '../styles/ProfileScreen.styles';
import { View, Text, StyleSheet, StatusBar, ScrollView, Image } from 'react-native';
import { colors, typography, spacing, borderRadius } from '../styles/theme';
import BottomNav from '../components/BottomNav';
import Icon from 'react-native-vector-icons/Feather';

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Profile</Text>
        </View>

        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
             <Icon name="user" size={40} color={colors.primary} />
          </View>
          <Text style={styles.name}>Dr. Nimal</Text>
          <Text style={styles.role}>Senior Practitioner</Text>

          <View style={styles.infoRow}>
            <Icon name="mail" size={16} color={colors.textSecondary} />
            <Text style={styles.infoText}>dr.nimal@hospital.com</Text>
          </View>
          
          <View style={styles.infoRow}>
             <Icon name="phone" size={16} color={colors.textSecondary} />
             <Text style={styles.infoText}>+94 77 123 4567</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          <View style={styles.menuItem}>
            <Text style={styles.menuText}>Notifications</Text>
            <Icon name="chevron-right" size={20} color={colors.textTertiary} />
          </View>
          <View style={styles.menuItem}>
            <Text style={styles.menuText}>Theme</Text>
            <Icon name="chevron-right" size={20} color={colors.textTertiary} />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
           <View style={styles.menuItem}>
            <Text style={[styles.menuText, styles.menuTextDanger]}>Log Out</Text>
            <Icon name="log-out" size={20} color={colors.danger} />
          </View>
        </View>

      </ScrollView>

      <BottomNav />
    </View>
  );
};

export default ProfileScreen;

