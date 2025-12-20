import React, { useState, useEffect, useMemo } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  Alert, 
  KeyboardAvoidingView, 
  Platform,
  ActivityIndicator
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import { typography, spacing, borderRadius } from '../styles/theme';
import { useTheme } from '../context/ThemeContext';
import { taskService } from '../services/api';
import { notificationService } from '../utils/notifications';
import { PRIORITY_LEVELS } from '../utils/constants';

const CATEGORIES = ['Personal', 'Patients', 'Admin'];

const CreateEditTaskScreen = ({ navigation, route }) => {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  
  const isEditing = route.params?.task;
  const initialTask = route.params?.task || {};
  
  const [title, setTitle] = useState(initialTask.title || '');
  const [description, setDescription] = useState(initialTask.description || '');
  const [priority, setPriority] = useState(initialTask.priority || PRIORITY_LEVELS.MEDIUM);
  const [category, setCategory] = useState(initialTask.category || 'Personal');
  const [dueDate, setDueDate] = useState(initialTask.dueDate ? new Date(initialTask.dueDate) : new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  
  // Reminder Offset in minutes. 0 = At time of due date.
  const [reminderOffset, setReminderOffset] = useState(0); 

  const REMINDER_OPTIONS = [
    { label: 'At due time', value: 0 },
    { label: '10 mins before', value: 10 },
    { label: '30 mins before', value: 30 },
    { label: '1 hour before', value: 60 },
  ];
  
  const [loading, setLoading] = useState(false);

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      // Preserve current time
      const currentValue = new Date(dueDate);
      selectedDate.setHours(currentValue.getHours());
      selectedDate.setMinutes(currentValue.getMinutes());
      setDueDate(selectedDate);
    }
  };

  const onTimeChange = (event, selectedDate) => {
    setShowTimePicker(false);
    if (selectedDate) {
      setDueDate(selectedDate);
    }
  };

  const handleSubmit = async () => {
    if (!title.trim()) {
      Alert.alert('Validation Error', 'Please enter a task title');
      return;
    }

    setLoading(true);
    try {
      const taskData = {
        title,
        description,
        priority,
        category,
        dueDate: dueDate.toISOString(),
      };

      // Calculate Notification Time
      const notificationTime = new Date(dueDate.getTime() - reminderOffset * 60000);

      if (isEditing) {
        await taskService.updateTask(initialTask.id, {
          ...initialTask,
          ...taskData,
          updatedAt: new Date().toISOString(), // Track last update time
        });
        
        // Update Notification
        notificationService.scheduleNotification(
          "Task Reminder", 
          `Due: ${title} ${reminderOffset > 0 ? `(in ${reminderOffset} mins)` : ''}`, 
          notificationTime,
          String(initialTask.id)
        );

        Alert.alert('Success', 'Task updated successfully!');
      } else {
        const newTask = await taskService.createTask({
          ...taskData,
          completed: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(), // Initialize updatedAt same as createdAt
        });
        
        // Schedule Notification (Use new task ID if available, otherwise might need another strategy or random ID)
        // Since we don't know the ID structure returned by mock API perfectly, we'll try to use it if it exists.
        // Assuming newTask.data.id or newTask.id
        
        const newId = newTask.data?.id || newTask.id || Date.now().toString();

        notificationService.scheduleNotification(
          "Task Reminder", 
          `Due: ${title} ${reminderOffset > 0 ? `(in ${reminderOffset} mins)` : ''}`, 
          notificationTime,
          String(newId)
        );
        
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
        <View style={styles.headerRow}>
          <TouchableOpacity 
            onPress={() => navigation.goBack()} 
            style={styles.backButton}
            hitSlop={{top: 10, bottom: 10, left: 10, right: 10}} // Increase touch area
          >
            <Text style={styles.backButtonIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>
            {isEditing ? 'Edit Task' : 'New Task'}
          </Text>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Task Title *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter task title..."
            placeholderTextColor={theme.textSecondary}
            value={title}
            onChangeText={setTitle}
            maxLength={50}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Category</Text>
          <View style={styles.rowContainer}>
            {CATEGORIES.map((cat) => (
              <TouchableOpacity
                key={cat}
                style={[
                  styles.chip,
                  category === cat && styles.chipActive
                ]}
                onPress={() => setCategory(cat)}
              >
                <Text style={[
                  styles.chipText,
                  category === cat && styles.chipTextActive
                ]}>{cat}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Due Date & Time</Text>
          <View style={styles.dateTimeRow}>
            <TouchableOpacity 
              style={styles.dateButton}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={styles.dateButtonText}>
                📅 {dueDate.toLocaleDateString()}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.dateButton}
              onPress={() => setShowTimePicker(true)}
            >
              <Text style={styles.dateButtonText}>
                ⏰ {dueDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </Text>
            </TouchableOpacity>
          </View>

          {showDatePicker && (
            <DateTimePicker
              value={dueDate}
              mode="date"
              display="default"
              onChange={onDateChange}
              minimumDate={new Date()}
            />
          )}

          {showTimePicker && (
            <DateTimePicker
              value={dueDate}
              mode="time"
              display="default"
              onChange={onTimeChange}
            />
          )}
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Remind Me Before</Text>
          <View style={styles.rowContainer}>
            {REMINDER_OPTIONS.map((opt) => (
              <TouchableOpacity
                key={opt.value}
                style={[
                  styles.chip,
                  reminderOffset === opt.value && styles.chipActive
                ]}
                onPress={() => setReminderOffset(opt.value)}
              >
                <Text style={[
                  styles.chipText,
                  reminderOffset === opt.value && styles.chipTextActive
                ]}>{opt.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Add details..."
            placeholderTextColor={theme.textSecondary}
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
                  { borderColor: priority === level ? theme.primary : theme.border }
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
          {loading ? (
             <ActivityIndicator color={theme.white} />
          ) : (
             <Text style={styles.submitButtonText}>
               {isEditing ? 'Save Changes' : 'Create Task'}
             </Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const createStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  scrollContent: {
    padding: spacing.l,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start', // Changed from space-between to align left
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  backButton: {
    marginRight: spacing.m,
    padding: 8,
    borderRadius: 20,
    backgroundColor: theme.surface,
    borderWidth: 1,
    borderColor: theme.border,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonIcon: {
    fontSize: 24,
    color: theme.primary,
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'center', // Android
    includeFontPadding: false, // Android
    lineHeight: 24, // Match fontSize for better vertical centering
  },
  headerTitle: {
    fontSize: typography.h2,
    fontWeight: typography.bold,
    color: theme.primary,
  },
  micButton: {
    padding: 8,
    backgroundColor: theme.surface,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: theme.border,
  },
  micText: {
    fontSize: 14,
    color: theme.accent,
  },
  formGroup: {
    marginBottom: spacing.l,
  },
  label: {
    fontSize: typography.body,
    fontWeight: typography.semiBold,
    color: theme.textPrimary,
    marginBottom: spacing.s,
  },
  input: {
    backgroundColor: theme.surface,
    borderRadius: 8,
    padding: spacing.m,
    borderWidth: 1,
    borderColor: theme.border,
    fontSize: typography.body,
    color: theme.textPrimary,
  },
  textArea: {
    minHeight: 120,
  },
  rowContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.s,
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: theme.surface,
    borderWidth: 1,
    borderColor: theme.border,
  },
  chipActive: {
    backgroundColor: theme.secondary,
    borderColor: theme.secondary,
  },
  chipText: {
    color: theme.textSecondary,
    fontSize: 12,
  },
  chipTextActive: {
    color: theme.white,
    fontWeight: 'bold',
  },
  dateTimeRow: {
    flexDirection: 'row',
    gap: spacing.m,
  },
  dateButton: {
    flex: 1,
    backgroundColor: theme.surface,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.border,
    alignItems: 'center',
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
    backgroundColor: theme.surface,
  },
  priorityButtonActive: {
    backgroundColor: theme.primary + '10', 
  },
  priorityText: {
    fontSize: typography.body,
    color: theme.textSecondary,
    fontWeight: typography.medium,
  },
  priorityTextActive: {
    color: theme.primary,
    fontWeight: typography.bold,
  },
  submitButton: {
    backgroundColor: theme.primary,
    padding: spacing.m,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: spacing.l,
    height: 50,
    justifyContent: 'center',
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  submitButtonText: {
    color: theme.white,
    fontSize: typography.h5,
    fontWeight: typography.bold,
  },
});

export default CreateEditTaskScreen;
