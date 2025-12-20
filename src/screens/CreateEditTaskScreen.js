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
import Icon from 'react-native-vector-icons/Ionicons';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { createStyles } from '../styles/CreateEditTaskScreen.styles';
import { useTheme } from '../context/ThemeContext';
import { taskService } from '../services/api';
import { notificationService } from '../utils/notifications';
import { PRIORITY_LEVELS } from '../utils/constants';

const CATEGORIES = ['Personal', 'Patients'];

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
      if (selectedDate < new Date(Date.now() - 60000)) {
        Alert.alert("Invalid Time", "Please select a future time.");
        return;
      }
      setDueDate(selectedDate);
    }
  };

  const handleSubmit = async () => {
    if (!title.trim()) {
      Alert.alert('Validation Error', 'Please enter a task title');
      return;
    }

    // Allow 1 minute buffer for immediate submissions
    if (!isEditing && dueDate < new Date(Date.now() - 60000)) {
      Alert.alert('Validation Error', 'Due date cannot be in the past');
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
      <Animated.ScrollView 
        contentContainerStyle={styles.scrollContent}
        entering={FadeInDown.duration(600).springify()}
      >
        <View style={styles.headerRow}>
          <TouchableOpacity 
            onPress={() => navigation.goBack()} 
            style={styles.backButton}
            hitSlop={{top: 10, bottom: 10, left: 10, right: 10}} 
          >
            <Icon name="caret-back" size={24} color={theme.textPrimary} />
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
                activeOpacity={0.7}
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
              activeOpacity={0.7}
            >
              <Text style={styles.dateButtonText}>
                📅 {dueDate.toLocaleDateString()}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.dateButton}
              onPress={() => setShowTimePicker(true)}
              activeOpacity={0.7}
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
              minimumDate={new Date()}
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
                activeOpacity={0.7}
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
                activeOpacity={0.7}
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
          activeOpacity={0.8}
        >
          {loading ? (
             <ActivityIndicator color={theme.white} />
          ) : (
             <Text style={styles.submitButtonText}>
               {isEditing ? 'Save Changes' : 'Create Task'}
             </Text>
          )}
        </TouchableOpacity>
      </Animated.ScrollView>
    </KeyboardAvoidingView>
  );
};

export default CreateEditTaskScreen;

