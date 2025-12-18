import React, { useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, StyleSheet, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { colors, typography, spacing } from '../styles/theme';
import { taskService } from '../services/api';

const TaskDetailScreen = ({ route, navigation }) => {
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
      Alert.alert("Error", "Failed to load task details");
      navigation.goBack();
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
      case 'high': return colors.error;
      case 'medium': return colors.accent;
      case 'low': return colors.success;
      default: return colors.textSecondary;
    }
  };

  if (loading || !task) {
    return (
      <View style={[styles.container, styles.centerContainer]}>
        <Text>Loading task details...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.title}>{task.title}</Text>
          <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor(task.priority) + '20' }]}>
            <Text style={[styles.priorityText, { color: getPriorityColor(task.priority) }]}>
              {task.priority || 'Normal'}
            </Text>
          </View>
        </View>

        <Text style={styles.label}>Description</Text>
        <Text style={styles.description}>
          {task.description || 'No description provided.'}
        </Text>

        <Text style={styles.label}>Status</Text>
        <View style={styles.statusContainer}>
          <View style={[styles.statusDot, { backgroundColor: task.completed ? colors.success : colors.secondary }]} />
          <Text style={styles.statusText}>
            {task.completed ? 'Completed' : 'Active'}
          </Text>
        </View>
        
        <Text style={styles.timestamp}>Created: {new Date(task.createdAt).toLocaleString()}</Text>
      </View>

      <View style={styles.actionContainer}>
        <TouchableOpacity 
          style={[styles.button, styles.editButton]}
          onPress={() => navigation.navigate('CreateEditTask', { task })}
        >
          <Text style={[styles.buttonText, { color: colors.white }]}>Edit Task</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, styles.deleteButton]}
          onPress={handleDelete}
          disabled={loading}
        >
          <Text style={[styles.buttonText, { color: colors.error }]}>Delete Task</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.m,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.l,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: spacing.l,
  },
  header: {
    marginBottom: spacing.l,
  },
  title: {
    fontSize: typography.h3,
    fontWeight: typography.bold,
    color: colors.textPrimary,
    marginBottom: spacing.s,
  },
  priorityBadge: {
    paddingHorizontal: spacing.s,
    paddingVertical: spacing.xs,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  priorityText: {
    fontSize: typography.caption,
    fontWeight: typography.semiBold,
  },
  label: {
    fontSize: typography.caption,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  description: {
    fontSize: typography.body,
    color: colors.textPrimary,
    marginBottom: spacing.l,
    lineHeight: 22,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.l,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: spacing.s,
  },
  statusText: {
    fontSize: typography.body,
    color: colors.textPrimary,
  },
  timestamp: {
    fontSize: typography.caption,
    color: colors.textSecondary,
    marginTop: spacing.s,
  },
  actionContainer: {
    gap: spacing.m,
  },
  button: {
    padding: spacing.m,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  editButton: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  deleteButton: {
    backgroundColor: 'transparent',
    borderColor: colors.error,
  },
  buttonText: {
    fontSize: typography.button,
    fontWeight: typography.semiBold,
  },
  centerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TaskDetailScreen;
