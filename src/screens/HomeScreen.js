import React, { useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { 
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { colors, typography, spacing, borderRadius, shadows } from '../styles/theme';
import { taskService } from '../services/api';
import { 
  sortTasks, 
  filterTasksBySearch, 
  filterTasksByStatus,
  getTaskStats 
} from '../utils/helpers';
import { FILTER_OPTIONS, SUCCESS_MESSAGES, ERROR_MESSAGES } from '../utils/constants';
import TaskCard from '../components/TaskCard';
import SearchBar from '../components/SearchBar';
import FilterButtons from '../components/FilterButtons';
import EmptyState from '../components/EmptyState';

const HomeScreen = ({ navigation }) => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState(FILTER_OPTIONS.ALL);

  useFocusEffect(
    useCallback(() => {
      loadTasks();
    }, [])
  );

  useEffect(() => {
    applyFilters();
  }, [tasks, searchQuery, activeFilter]);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const result = await taskService.getAllTasks();
      
      if (result.data) {
        setTasks(result.data || []);
      } else {
         setTasks(result.data || []);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', ERROR_MESSAGES.LOAD_FAILED || 'Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadTasks();
    setRefreshing(false);
  };

  const applyFilters = () => {
    let filtered = [...tasks];
    
    filtered = filterTasksBySearch(filtered, searchQuery);
    filtered = filterTasksByStatus(filtered, activeFilter);
    filtered = sortTasks(filtered);
    
    setFilteredTasks(filtered);
  };

  const handleToggleComplete = async (task) => {
    try {
      // Assuming updateTask usage for toggle as specific toggle endpoint wasn't in api.js
      const result = await taskService.updateTask(task.id, { ...task, completed: !task.completed });
      
      if (result.status === 200 || result.data) {
        setTasks(prevTasks =>
          prevTasks.map(t => t.id === task.id ? { ...t, completed: !t.completed } : t)
        );
        
        const message = !task.completed 
          ? SUCCESS_MESSAGES.TASK_COMPLETED 
          : SUCCESS_MESSAGES.TASK_UNCOMPLETED;
        console.log(message);
      } else {
        Alert.alert('Error', ERROR_MESSAGES.UPDATE_FAILED);
      }
    } catch (error) {
      Alert.alert('Error', ERROR_MESSAGES.NETWORK_ERROR);
    }
  };

  const handleDeleteTask = async (taskId) => {
    Alert.alert(
      'Delete Task',
      'Are you sure you want to delete this task?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const result = await taskService.deleteTask(taskId);
              
              if (result.status === 200 || result.data) {
                setTasks(prevTasks => prevTasks.filter(t => t.id !== taskId));
                console.log(SUCCESS_MESSAGES.TASK_DELETED);
              } else {
                Alert.alert('Error', ERROR_MESSAGES.DELETE_FAILED);
              }
            } catch (error) {
              Alert.alert('Error', ERROR_MESSAGES.NETWORK_ERROR);
            }
          },
        },
      ]
    );
  };

  const handleTaskPress = (task) => {
    navigation.navigate('TaskDetail', { taskId: task.id });
  };

  const handleCreateTask = () => {
    navigation.navigate('CreateEditTask', { mode: 'create' });
  };

  const taskStats = getTaskStats(tasks);

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Loading tasks...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Task Manager</Text>
        <View style={styles.statsContainer}>
          <Text style={styles.statsText}>
            {taskStats.active} active • {taskStats.completed} completed
          </Text>
        </View>
      </View>

      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        onClear={() => setSearchQuery('')}
      />

      <FilterButtons
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        taskStats={taskStats}
      />

      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TaskCard
            task={item}
            onPress={handleTaskPress}
            onToggleComplete={handleToggleComplete}
            onDelete={handleDeleteTask}
          />
        )}
        contentContainerStyle={[
          styles.listContent,
          filteredTasks.length === 0 && styles.listEmpty
        ]}
        ListEmptyComponent={<EmptyState filter={activeFilter} />}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[colors.primary]}
            tintColor={colors.primary}
          />
        }
        showsVerticalScrollIndicator={false}
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={handleCreateTask}
        activeOpacity={0.8}
      >
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  loadingText: {
    marginTop: spacing.md,
    fontSize: typography.body,
    color: colors.textSecondary,
  },
  header: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
    backgroundColor: colors.surface,
    ...shadows.sm,
  },
  headerTitle: {
    fontSize: typography.h2,
    fontWeight: typography.bold,
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statsText: {
    fontSize: typography.bodySmall,
    color: colors.textSecondary,
  },
  listContent: {
    paddingVertical: spacing.md,
  },
  listEmpty: {
    flexGrow: 1,
  },
  fab: {
    position: 'absolute',
    right: spacing.lg,
    bottom: spacing.lg,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.lg,
  },
  fabIcon: {
    fontSize: 32,
    color: colors.textInverse,
    fontWeight: typography.regular,
  },
});

export default HomeScreen;
