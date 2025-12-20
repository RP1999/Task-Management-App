import React, { useState, useEffect, useCallback } from 'react';
import styles from '../styles/TaskDetailScreen.styles';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, StyleSheet, ScrollView, Alert, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native';
import { colors, typography, spacing, borderRadius, shadows } from '../styles/theme';
import { taskService } from '../services/api';
import Icon from 'react-native-vector-icons/Ionicons';

const TaskDetailScreen = ({ route, navigation }) => {
  // ... (logic remains same)
  const { taskId, task: initialTask } = route.params;
  const [task, setTask] = useState(initialTask || null);
  const [loading, setLoading] = useState(!initialTask);

  useFocusEffect(
    useCallback(() => {
      if (taskId) {
        loadTask();
      }
    }, [taskId])
  );
  
  const loadTask = async () => {
    try {
      setLoading(true);
      const result = await taskService.getTaskById(taskId);
      if (result.data) {
        setTask(result.data);
      } else {
        Alert.alert("Error", "Task not found");
        navigation.goBack();
      }
    } catch (error) {
       // Silent error or retry logic
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    Alert.alert(
      "Delete Task",
      "Are you sure you want to delete this task?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Delete", 
          style: "destructive",
          onPress: async () => {
            setLoading(true);
            try {
              await taskService.deleteTask(task.id);
              navigation.goBack();
            } catch (error) {
              Alert.alert("Error", "Failed to delete task");
            } finally {
              setLoading(false);
            }
          }
        }
      ]
    );
  };

  const getPriorityColor = (priority) => {
    switch(priority?.toLowerCase()) {
      case 'high': return colors.danger;
      case 'medium': return colors.warning;
      case 'low': return colors.success;
      default: return colors.textSecondary;
    }
  };

  if (loading || !task) {
    return (
      <View style={[styles.container, styles.centerContainer]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Header / Back */}
        <View style={styles.headerNav}>
           <TouchableOpacity 
             style={styles.backButton}
             onPress={() => navigation.goBack()}
           >
             <Icon name="caret-back" size={24} color={colors.textPrimary} />
           </TouchableOpacity>
           <Text style={styles.headerTitle}>Task Details</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.title}>{task.title}</Text>
            <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor(task.priority) + '15' }]}>
              <Text style={[styles.priorityText, { color: getPriorityColor(task.priority) }]}>
                {task.priority || 'Normal'}
              </Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.detailRow}>
             <View style={styles.detailItem}>
               <Text style={styles.label}>Category</Text>
               <Text style={styles.value}>{task.category || 'Personal'}</Text>
             </View>
             <View style={styles.detailItem}>
               <Text style={styles.label}>Due Date</Text>
                <Text style={styles.value}>
                  {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No date set'}
                </Text>
             </View>
          </View>

          <View style={styles.detailSection}>
             <Text style={styles.label}>Description</Text>
             <Text style={styles.description}>
               {task.description || 'No description provided.'}
             </Text>
          </View>
          
          <View style={styles.statusFooter}>
             <Text style={styles.label}>Status</Text>
             <View style={styles.statusBadge}>
                <View style={[styles.statusDot, { backgroundColor: task.completed ? colors.success : colors.info }]} />
                <Text style={[styles.statusText, { color: task.completed ? colors.success : colors.info }]}>
                  {task.completed ? 'Completed' : 'In Progress'}
                </Text>
             </View>
          </View>
        </View>

        <View style={styles.actionContainer}>
          <TouchableOpacity 
            style={[styles.button, styles.editButton]}
            onPress={() => navigation.navigate('CreateEditTask', { task })}
          >
            <Text style={[styles.buttonText, styles.buttonTextWhite]}>Edit Task</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.button, styles.deleteButton]}
            onPress={handleDelete}
            disabled={loading}
          >
            <Text style={[styles.buttonText, styles.buttonTextDanger]}>Delete Task</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TaskDetailScreen;

