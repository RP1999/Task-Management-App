import React, { useState, useEffect, useCallback } from 'react';
import styles from '../styles/HomeScreen.styles';
import { useFocusEffect } from '@react-navigation/native';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,

  Alert,
  StatusBar,
  TextInput,
} from 'react-native';
import { colors, typography, spacing, borderRadius, shadows } from '../styles/theme';
import Icon from 'react-native-vector-icons/Feather';
import BottomNav from '../components/BottomNav';
import { taskService } from '../services/api';
import { 
  sortTasks, 
  filterTasksBySearch, 
  filterTasksByStatus,
  getTaskStats 
} from '../utils/helpers';
import { FILTER_OPTIONS, SUCCESS_MESSAGES, ERROR_MESSAGES } from '../utils/constants';

import DateSelector from '../components/DateSelector';
import FilterTabs from '../components/FilterTabs';
import TaskCard from '../components/TaskCard';
import ProgressCard from '../components/ProgressCard';
import EmptyState from '../components/EmptyState';
import LottieLoader from '../components/LottieLoader';
import NotificationModal from '../components/NotificationModal';

const HomeScreen = ({ navigation }) => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState('Ongoing'); // 'All', 'Ongoing', 'Completed'
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState(null);
  const [completionPercentage, setCompletionPercentage] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [notificationTasks, setNotificationTasks] = useState([]);

  // Load tasks when screen comes into focus (auto-refresh)
  useFocusEffect(
    useCallback(() => {
      loadTasks();
    }, [])
  );

  useEffect(() => {
    applyFilters();
    calculateProgress();
  }, [tasks, activeTab, searchQuery, categoryFilter]);

  const loadTasks = async () => {
    try {
      const result = await taskService.getAllTasks();
      if (result.data) {
        setTasks(result.data || []);
      }
    } catch (error) {
       // console.log('Error loading tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateProgress = () => {
    if (tasks.length === 0) {
      setCompletionPercentage(0);
      return;
    }
    const completed = tasks.filter(t => t.completed).length;
    setCompletionPercentage(Math.round((completed / tasks.length) * 100));
  };

  const applyFilters = () => {
    let filtered = [...tasks];
    
    // Search Filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(t => 
        t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (t.category && t.category.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Category Filter (Hidden)
    if (categoryFilter) {
      filtered = filtered.filter(t => 
        t.category && t.category.toLowerCase().includes(categoryFilter.toLowerCase())
      );
    }

    // Tab Filter
    if (activeTab === 'Ongoing') {
      filtered = filtered.filter(t => !t.completed);
    } else if (activeTab === 'Completed') {
      filtered = filtered.filter(t => t.completed);
    }
    // 'All' shows everything

    // Sort: Active first, then by date desc
    filtered.sort((a, b) => {
       if (a.completed === b.completed) {
          const dateA = new Date(a.updatedAt || a.createdAt);
          const dateB = new Date(b.updatedAt || b.createdAt);
          return dateB - dateA;
       }
       return a.completed ? 1 : -1;
    });
    
    setFilteredTasks(filtered);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadTasks();
    setRefreshing(false);
  };

  const handleTaskPress = (task) => {
    navigation.navigate('TaskDetail', { taskId: task.id, task });
  };

  const handleToggleComplete = async (task) => {
    try {
      const now = new Date().toISOString();
      // Optimistic update
      const updatedTasks = tasks.map(t => 
        t.id === task.id ? { ...t, completed: !t.completed, updatedAt: now } : t
      );
      setTasks(updatedTasks);

      await taskService.updateTask(task.id, { ...task, completed: !task.completed, updatedAt: now });
    } catch (error) {
      loadTasks(); // Revert on failure
      Alert.alert('Error', ERROR_MESSAGES.UPDATE_FAILED);
    }
  };

  const handleCreateTask = () => {
    navigation.navigate('CreateEditTask', { mode: 'create' });
  };

  const handleToggleView = () => {
    if (categoryFilter === 'Patient') {
      setCategoryFilter('Personal'); // Patient -> Personal
    } else if (categoryFilter === 'Personal') {
      setCategoryFilter(null); // Personal -> All
    } else {
      setCategoryFilter('Patient'); // All -> Patient
      setSearchQuery(''); 
      setActiveTab('All');
    }
  };

  const handleNotificationPress = () => {
    const overdueTasks = tasks.filter(t => {
      if (t.completed || !t.dueDate) return false;
      return new Date(t.dueDate) < new Date();
    }).sort((a, b) => {
      // Sort by last updated (or created) to match Dashboard order
      const dateA = new Date(a.updatedAt || a.createdAt);
      const dateB = new Date(b.updatedAt || b.createdAt);
      return dateB - dateA;
    });
    
    setNotificationTasks(overdueTasks);
    setModalVisible(true);
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <LottieLoader size={200} />
      </View>
    );
  }

  const getProgressSubtitle = () => {
    if (completionPercentage === 0) return "Let's get started";
    if (completionPercentage === 100) return "Great job!";
    return "almost done!";
  };

  const getButtonText = () => {
    if (categoryFilter === 'Patient') return "View Personal Tasks";
    if (categoryFilter === 'Personal') return "View All Tasks";
    return "View Patient Tasks";
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      
      <ScrollView 
        contentContainerStyle={styles.scrollViewContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View>
              <Text style={styles.dashboardTitle}>DASHBOARD</Text>
              <View style={styles.userInfo}>
                <Text style={styles.greeting}>Hello,</Text>
                <Text style={styles.userName}>Dr. Nimal</Text>
              </View>
            </View>
            <TouchableOpacity 
              style={styles.notificationButton}
              activeOpacity={0.7}
              onPress={handleNotificationPress}
            >
              <View style={styles.notificationBadge} />
              <Icon name="bell" size={24} color={colors.textPrimary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Progress Card */}
        <ProgressCard
          percentage={completionPercentage}
          title="Daily Goals"
          subtitle={getProgressSubtitle()}
          buttonText={getButtonText()}
          onPress={handleToggleView}
        />

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Icon name="search" size={22} color={colors.textTertiary} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search your tasks..."
            placeholderTextColor={colors.textTertiary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Filter Tabs */}
        <View style={styles.tabContainer}>
          {['All', 'Ongoing', 'Completed'].map((tab) => (
            <TouchableOpacity
              key={tab}
              activeOpacity={0.8}
              style={[styles.tab, activeTab === tab && styles.tabActive]}
              onPress={() => {
                setActiveTab(tab);
                setCategoryFilter(null);
              }}
            >
              <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Tasks List */}
        <View style={styles.listContainer}>
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task, index) => (
              <TaskCard
                key={task.id}
                task={task}
                index={index}
                onPress={handleTaskPress}
                onToggleComplete={handleToggleComplete}
              />
            ))
          ) : (
             <View style={styles.emptyState}>
               <Text style={styles.emptyText}>No tasks found</Text>
             </View>
          )}
        </View>

        {/* Bottom Spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Reusable Bottom Navigation */}
      <BottomNav />

      <NotificationModal 
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        tasks={notificationTasks}
      />
    </View>
  );
};

export default HomeScreen;
