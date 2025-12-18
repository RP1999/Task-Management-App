import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { colors, typography, spacing } from '../styles/theme';
import { taskService } from '../services/api';
import { PRIORITY_LEVELS } from '../utils/constants';

const CreateEditTaskScreen = ({ navigation, route }) => {
  const isEditing = route.params?.task;
  const initialTask = route.params?.task || {};
  
  const [title, setTitle] = useState(initialTask.title || '');
  const [description, setDescription] = useState(initialTask.description || '');
  const [priority, setPriority] = useState(initialTask.priority || PRIORITY_LEVELS.MEDIUM);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!title.trim()) {
      Alert.alert('Validation Error', 'Please enter a task title');
      return;
    }

    setLoading(true);
    try {
      if (isEditing) {
        await taskService.updateTask(initialTask.id, {
          ...initialTask,
          title,
          description,
          priority,
        });
        Alert.alert('Success', 'Task updated successfully!');
      } else {
        await taskService.createTask({
          title,
          description,
          priority,
          completed: false,
          createdAt: new Date().toISOString(),
        });
        Alert.alert('Success', 'Task created successfully!');
      }
      navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.headerTitle}>
          {isEditing ? 'Edit Task' : 'New Task'}
        </Text>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Task Title *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter task title..."
            value={title}
            onChangeText={setTitle}
            maxLength={50}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Add details..."
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Priority</Text>
          <View style={styles.priorityContainer}>
            {Object.values(PRIORITY_LEVELS).map((level) => (
              <TouchableOpacity
                key={level}
                style={[
                  styles.priorityButton,
                  priority === level && styles.priorityButtonActive,
                  { borderColor: priority === level ? colors.primary : colors.border }
                ]}
                onPress={() => setPriority(level)}
              >
                <Text style={[
                  styles.priorityText,
                  priority === level && styles.priorityTextActive
                ]}>
                  {level}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity 
          style={[styles.submitButton, loading && styles.buttonDisabled]}
          onPress={handleSubmit}
          disabled={loading}
        >
          <Text style={styles.submitButtonText}>
            {loading ? 'Saving...' : (isEditing ? 'Save Changes' : 'Create Task')}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    padding: spacing.l,
  },
  headerTitle: {
    fontSize: typography.h2,
    fontWeight: typography.bold,
    color: colors.primary,
    marginBottom: spacing.xl,
  },
  formGroup: {
    marginBottom: spacing.l,
  },
  label: {
    fontSize: typography.body,
    fontWeight: typography.semiBold,
    color: colors.textPrimary,
    marginBottom: spacing.s,
  },
  input: {
    backgroundColor: colors.surface,
    borderRadius: 8,
    padding: spacing.m,
    borderWidth: 1,
    borderColor: colors.border,
    fontSize: typography.body,
    color: colors.textPrimary,
  },
  textArea: {
    minHeight: 120,
  },
  priorityContainer: {
    flexDirection: 'row',
    gap: spacing.s,
  },
  priorityButton: {
    flex: 1,
    paddingVertical: spacing.s,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    backgroundColor: colors.surface,
  },
  priorityButtonActive: {
    backgroundColor: colors.primary + '10', // 10% opacity primary
  },
  priorityText: {
    fontSize: typography.body,
    color: colors.textSecondary,
    fontWeight: typography.medium,
  },
  priorityTextActive: {
    color: colors.primary,
    fontWeight: typography.bold,
  },
  submitButton: {
    backgroundColor: colors.primary,
    padding: spacing.m,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: spacing.l,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  submitButtonText: {
    color: colors.white,
    fontSize: typography.h5,
    fontWeight: typography.bold,
  },
});

export default CreateEditTaskScreen;
