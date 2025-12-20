import React, { useState, useCallback } from 'react';
import styles from '../styles/ReportsScreen.styles';
import { View, Text, StyleSheet, StatusBar, ScrollView, RefreshControl } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { colors, typography, spacing, borderRadius, shadows } from '../styles/theme';
import { taskService } from '../services/api';
import Icon from 'react-native-vector-icons/Feather';
import BottomNav from '../components/BottomNav';
import { getTaskStats, getDailyCompletionStats } from '../utils/helpers';

const StatCard = ({ label, value, icon, color }) => (
  <View style={styles.statCard}>
    <View style={[styles.iconContainer, { backgroundColor: `${color}20` }]}>
       <Icon name={icon} size={24} color={color} />
    </View>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

const ReportsScreen = () => {
  const [stats, setStats] = useState({ total: 0, active: 0, completed: 0, overdue: 0 });
  const [dailyStats, setDailyStats] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  const loadData = async () => {
    try {
      const result = await taskService.getAllTasks();
      if (result.data) {
        const newStats = getTaskStats(result.data);
        setStats(newStats);
        setDailyStats(getDailyCompletionStats(result.data));
      }
    } catch (error) {
       console.log('Error loading stats:', error);
    } finally {
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadData();
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Reports</Text>
        </View>

        {/* Overview Card with Bar Graph */}
        <View style={styles.overviewCard}>
          <View style={styles.overviewHeader}>
             <View>
               <Text style={styles.overviewTitle}>Weekly Activity</Text>
               <Text style={styles.overviewSubtitle}>Task completion rate by day</Text>
             </View>
          </View>

          <View style={styles.graphContainer}>
            {dailyStats.map((day, index) => (
              <View key={index} style={styles.graphColumn}>
                <View style={styles.barContainer}>
                  <View style={[styles.barFill, { height: `${day.rate}%` }]} />
                </View>
                <Text style={styles.dayLabel}>{day.day}</Text>
              </View>
            ))}
          </View>
        </View>

        <Text style={styles.sectionTitle}>Statistics</Text>

        <View style={styles.grid}>
          <StatCard 
            label="Total Tasks" 
            value={stats.total} 
            icon="layers" 
            color={colors.primary} 
          />
          <StatCard 
            label="Completed" 
            value={stats.completed} 
            icon="check-circle" 
            color={colors.success} 
          />
          <StatCard 
            label="Pending" 
            value={stats.active} 
            icon="clock" 
            color={colors.warning} 
          />
          <StatCard 
            label="Overdue (Est)" 
            value={stats.overdue} 
            icon="alert-circle" 
            color={colors.danger} 
          />
        </View>

      </ScrollView>
      <BottomNav />
    </View>
  );
};

export default ReportsScreen;

