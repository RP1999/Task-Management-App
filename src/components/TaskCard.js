// src/components/TaskCard.js
import React, { useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { typography, spacing, borderRadius, shadows } from '../styles/theme';
import { getRelativeTime, getPriorityColor, truncateText } from '../utils/helpers';
import { useTheme } from '../context/ThemeContext';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // We will enable this later after confirming install

const TaskCard = ({ task, onPress, onToggleComplete, onDelete }) => {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const priorityColor = getPriorityColor(task.priority);
  
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => onPress(task)}
      style={styles.container}
    >
      <View style={styles.cardContent}>
        {/* Left: Checkbox */}
        <TouchableOpacity
          onPress={() => onToggleComplete(task)}
          style={styles.checkboxContainer}
        >
          <View style={[
            styles.checkbox,
            task.completed && styles.checkboxCompleted
          ]}>
            {task.completed && <Text style={styles.checkmark}>✓</Text>}
          </View>
        </TouchableOpacity>

        {/* Middle: Task Content */}
        <View style={styles.contentContainer}>
          <View style={styles.headerRow}>
             <Text
              style={[
                styles.title,
                task.completed && styles.titleCompleted
              ]}
              numberOfLines={1}
            >
              {task.title}
            </Text>
            {task.category && (
               <View style={styles.categoryBadge}>
                 <Text style={styles.categoryText}>{task.category}</Text>
               </View>
            )}
          </View>
          
          {task.description && (
            <Text
              style={styles.description}
              numberOfLines={2}
            >
              {truncateText(task.description, 100)}
            </Text>
          )}

          <View style={styles.metaContainer}>
            {/* Priority Badge */}
            <View style={[styles.priorityBadge, { backgroundColor: priorityColor + '20' }]}>
              <View style={[styles.priorityDot, { backgroundColor: priorityColor }]} />
              <Text style={[styles.priorityText, { color: priorityColor }]}>
                {task.priority?.toUpperCase() || 'MEDIUM'}
              </Text>
            </View>

            {/* Date/Time info */}
            <View style={styles.dateContainer}>
               {task.dueDate && (
                 <Text style={[styles.timestamp, { marginRight: 8, color: theme.accent }]}>
                   📅 {new Date(task.dueDate).toLocaleDateString()}
                 </Text>
               )}
               <Text style={styles.timestamp}>
                {getRelativeTime(task.updatedAt || task.createdAt)}
              </Text>
            </View>
          </View>
        </View>

        {/* Right: Priority Indicator */}
        <View style={[styles.priorityIndicator, { backgroundColor: priorityColor }]} />
      </View>
    </TouchableOpacity>
  );
};

const createStyles = (theme) => StyleSheet.create({
  container: {
    marginBottom: spacing.md,
    marginHorizontal: spacing.md,
  },
  cardContent: {
    flexDirection: 'row',
    backgroundColor: theme.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    ...shadows.md,
    position: 'relative',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: theme.borderLight,
  },
  checkboxContainer: {
    marginRight: spacing.md,
    justifyContent: 'flex-start',
    paddingTop: 2,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: borderRadius.sm,
    borderWidth: 2,
    borderColor: theme.border,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.surface,
  },
  checkboxCompleted: {
    backgroundColor: theme.success,
    borderColor: theme.success,
  },
  checkmark: {
    color: theme.white,
    fontSize: 14,
    fontWeight: typography.bold,
  },
  contentContainer: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  title: {
    fontSize: typography.body,
    fontWeight: typography.semiBold,
    color: theme.textPrimary,
    flex: 1,
    marginRight: spacing.sm,
  },
  titleCompleted: {
    textDecorationLine: 'line-through',
    color: theme.textSecondary,
  },
  categoryBadge: {
    backgroundColor: theme.background,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: theme.border,
  },
  categoryText: {
    fontSize: 10,
    color: theme.textSecondary,
    fontWeight: '600',
  },
  description: {
    fontSize: typography.bodySmall,
    color: theme.textSecondary,
    marginBottom: spacing.sm,
    lineHeight: 18,
  },
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.xs,
    flexWrap: 'wrap',
  },
  priorityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.md,
  },
  priorityDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: spacing.xs,
  },
  priorityText: {
    fontSize: typography.caption,
    fontWeight: typography.semiBold,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timestamp: {
    fontSize: typography.caption,
    color: theme.textSecondary,
  },
  priorityIndicator: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: 4,
    borderTopRightRadius: borderRadius.lg,
    borderBottomRightRadius: borderRadius.lg,
  },
});

export default TaskCard;
