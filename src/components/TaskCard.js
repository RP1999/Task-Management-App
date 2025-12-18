// src/components/TaskCard.js
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import { colors, typography, spacing, borderRadius, shadows } from '../styles/theme';
import { getRelativeTime, getPriorityColor, truncateText } from '../utils/helpers';

const TaskCard = ({ task, onPress, onToggleComplete, onDelete }) => {
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
          <Text
            style={[
              styles.title,
              task.completed && styles.titleCompleted
            ]}
            numberOfLines={2}
          >
            {task.title}
          </Text>
          
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

            {/* Timestamp */}
            <Text style={styles.timestamp}>
              {getRelativeTime(task.createdAt)}
            </Text>
          </View>
        </View>

        {/* Right: Priority Indicator */}
        <View style={[styles.priorityIndicator, { backgroundColor: priorityColor }]} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
    marginHorizontal: spacing.md,
  },
  cardContent: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    ...shadows.md,
    position: 'relative',
    overflow: 'hidden',
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
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
  },
  checkboxCompleted: {
    backgroundColor: colors.success,
    borderColor: colors.success,
  },
  checkmark: {
    color: colors.textInverse,
    fontSize: 14,
    fontWeight: typography.bold,
  },
  contentContainer: {
    flex: 1,
  },
  title: {
    fontSize: typography.body,
    fontWeight: typography.semiBold,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
    lineHeight: typography.body * typography.lineHeightNormal,
  },
  titleCompleted: {
    textDecorationLine: 'line-through',
    color: colors.textTertiary,
  },
  description: {
    fontSize: typography.bodySmall,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
    lineHeight: typography.bodySmall * typography.lineHeightNormal,
  },
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  timestamp: {
    fontSize: typography.caption,
    color: colors.textTertiary,
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
