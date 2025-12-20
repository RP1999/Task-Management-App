import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import styles from '../styles/TaskGroupCard.styles';

const TaskGroupCard = ({ group, onPress }) => {
  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[styles.iconContainer, { backgroundColor: group.color + '15' }]}>
        <Text style={styles.icon}>{group.icon}</Text>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.title}>{group.title}</Text>
        <Text style={styles.subtitle}>{group.tasks}</Text>
      </View>
      
      <View style={styles.progressContainer}>
         {/* Simple circular indicator */}
         <View style={[styles.progressCircle, { borderColor: group.color }]}>
            <Text style={[styles.progressText, { color: group.color }]}>
              {group.progress}%
            </Text>
         </View>
      </View>
    </TouchableOpacity>
  );
};

export default TaskGroupCard;

