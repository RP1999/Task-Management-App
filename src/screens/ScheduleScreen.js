import React, { useState, useCallback } from 'react';
import styles from '../styles/ScheduleScreen.styles';
import { View, Text, StyleSheet, StatusBar, FlatList } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { colors, typography, spacing } from '../styles/theme';
import { taskService } from '../services/api';
import DateSelector from '../components/DateSelector';
import TaskCard from '../components/TaskCard';
import BottomNav from '../components/BottomNav';
import LottieLoader from '../components/LottieLoader';

const ScheduleScreen = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      loadTasks();
    }, [])
  );

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

  const getTasksForDate = (date) => {
    return tasks.filter(task => {
      if (!task.dueDate) return false;
      const taskDate = new Date(task.dueDate);
      const targetDate = new Date(date);
      
      return taskDate.getDate() === targetDate.getDate() &&
             taskDate.getMonth() === targetDate.getMonth() &&
             taskDate.getFullYear() === targetDate.getFullYear();
    });
  };

  const filteredTasks = getTasksForDate(selectedDate);

  const handleTaskPress = (task) => {
    navigation.navigate('TaskDetail', { taskId: task.id, task });
  };

  const handleToggleComplete = async (task) => {
     try {
       const now = new Date().toISOString();
       const updatedTasks = tasks.map(t => 
         t.id === task.id ? { ...t, completed: !t.completed, updatedAt: now } : t
       );
       setTasks(updatedTasks);
       await taskService.updateTask(task.id, { ...task, completed: !task.completed, updatedAt: now });
     } catch (error) {
       loadTasks();
     }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      
      <View style={styles.header}>
        <Text style={styles.title}>Schedule</Text>
      </View>

      <DateSelector 
        selectedDate={selectedDate} 
        onSelectDate={setSelectedDate} 
      />

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>
          {selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', weekday: 'long' })}
        </Text>
        
        {loading ? (
          <LottieLoader size={150} style={styles.loaderContainer} />
        ) : (
          <FlatList
            data={filteredTasks}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <TaskCard 
                task={item} 
                onPress={handleTaskPress}
                onToggleComplete={handleToggleComplete}
              />
            )}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No tasks scheduled for this day</Text>
              </View>
            }
            contentContainerStyle={styles.listContent}
          />
        )}
      </View>
      <BottomNav />
    </View>
  );
};

export default ScheduleScreen;

