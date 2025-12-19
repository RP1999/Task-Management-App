import React, { useState, useEffect, useCallback, useMemo } from 'react';
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
import { typography, spacing, borderRadius, shadows } from '../styles/theme';
import { useTheme } from '../context/ThemeContext';
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
import RNPrint from 'react-native-print';

const HomeScreen = ({ navigation }) => {
  const { theme, toggleTheme, isDark } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

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
  
  const handleExportPDF = async () => {
    try {
      const html = `
        <html>
          <head>
            <style>
              body { font-family: Helvetica, Arial, sans-serif; padding: 20px; }
              h1 { color: ${theme.primary}; }
              table { width: 100%; border-collapse: collapse; margin-top: 20px; }
              th, td { padding: 10px; border-bottom: 1px solid #ddd; text-align: left; }
              th { background-color: #f2f2f2; }
              .completed { text-decoration: line-through; color: #888; }
            </style>
          </head>
          <body>
            <h1>Task List</h1>
            <p>Generated on ${new Date().toLocaleDateString()}</p>
            <table>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Priority</th>
                <th>Due Date</th>
                <th>Status</th>
              </tr>
              ${filteredTasks.map(task => `
                <tr class="${task.completed ? 'completed' : ''}">
                  <td>${task.title}</td>
                  <td>${task.category || '-'}</td>
                  <td>${task.priority || 'Medium'}</td>
                  <td>${task.dueDate ? new Date(task.dueDate).toLocaleDateString() : '-'}</td>
                  <td>${task.completed ? 'Completed' : 'Active'}</td>
                </tr>
              `).join('')}
            </table>
          </body>
        </html>
      `;

      await RNPrint.print({ html });
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to generate PDF');
    }
  };

  const taskStats = getTaskStats(tasks);

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={theme.primary} />
        <Text style={styles.loadingText}>Loading tasks...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTopRow}>
          <Text style={styles.headerTitle}>Task Manager</Text>
          <View style={styles.headerActions}>
            <TouchableOpacity onPress={handleExportPDF} style={styles.iconButton}>
               <Text style={{fontSize: 20}}>📄</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleTheme} style={styles.iconButton}>
               <Text style={{fontSize: 20}}>{isDark ? '☀️' : '🌙'}</Text>
            </TouchableOpacity>
          </View>
        </View>
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
            colors={[theme.primary]}
            tintColor={theme.primary}
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

const createStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.background,
  },
  loadingText: {
    marginTop: spacing.md,
    fontSize: typography.body,
    color: theme.textSecondary,
  },
  header: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
    backgroundColor: theme.surface,
    ...shadows.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.borderLight,
  },
  headerTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  headerTitle: {
    fontSize: typography.h2,
    fontWeight: typography.bold,
    color: theme.primary,
  },
  headerActions: {
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: spacing.m,
    padding: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statsText: {
    fontSize: 12, // bodySmall
    color: theme.textSecondary,
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
    backgroundColor: theme.accent,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.lg,
  },
  fabIcon: {
    fontSize: 32,
    color: theme.white,
    fontWeight: typography.regular,
  },
});

export default HomeScreen;
