import React from 'react';
import styles from '../styles/TaskCard.styles';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Animated, { FadeInDown, Layout, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { colors, typography, spacing, borderRadius, shadows } from '../styles/theme';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const TaskCard = ({ task, onPress, onToggleComplete, index = 0 }) => {
  const isCompleted = task.completed;
  const scale = useSharedValue(1);

  const getPriorityColor = (p) => {
    switch (p?.toLowerCase()) {
      case 'high': return colors.danger;
      case 'medium': return colors.warning;
      case 'low': return colors.success;
      default: return colors.textTertiary;
    }
  };

  const priorityColor = getPriorityColor(task.priority);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.95);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  return (
    <Animated.View 
      entering={FadeInDown.delay(index * 100).springify()} 
      layout={Layout.springify()}
      style={styles.container}
    >
      <AnimatedPressable
        onPress={() => onPress(task)}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[styles.cardContent, animatedStyle]}
      >
        {/* Priority Strip */}
        <View style={[styles.priorityStrip, { backgroundColor: priorityColor }]} />

        <View style={styles.contentWrapper}>
          <View style={styles.headerRow}>
             <View style={[styles.categoryBadge, styles.badgeBackground]}>
                <Text style={styles.categoryText}>{task.category || 'Personal'}</Text>
             </View>
             {task.priority && (
               <View style={[styles.priorityBadge, { backgroundColor: priorityColor + '20' }]}>
                 <Text style={[styles.priorityText, { color: priorityColor }]}>{task.priority}</Text>
               </View>
             )}
          </View>

          <Text
            style={[styles.title, isCompleted && styles.titleCompleted]}
            numberOfLines={2}
          >
            {task.title}
          </Text>

          {task.dueDate && (
            <View style={styles.metaRow}>
              <Icon 
                name="clock" 
                size={14} 
                color={(!isCompleted && new Date(task.dueDate) < new Date()) ? colors.danger : colors.textSecondary} 
              />
              <Text style={[
                styles.timeText, 
                (!isCompleted && new Date(task.dueDate) < new Date()) && { color: colors.danger, fontWeight: '700' }
              ]}>
                {new Date(task.dueDate).toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
              </Text>
            </View>
          )}
        </View>

        <TouchableOpacity
          style={[
            styles.checkboxContainer, 
            isCompleted && styles.checkboxCompleted,
            { borderColor: isCompleted ? colors.primary : colors.border }
          ]}
          onPress={() => onToggleComplete(task)}
          hitSlop={10}
        >
          {isCompleted && <Icon name="check" size={16} color={colors.white} />}
        </TouchableOpacity>
      </AnimatedPressable>
    </Animated.View>
  );
};

export default TaskCard;
