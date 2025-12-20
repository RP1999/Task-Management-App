import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import styles from '../styles/ProjectCard.styles';

const ProjectCard = ({ project, onPress }) => (
  <TouchableOpacity onPress={onPress} style={[styles.container, { backgroundColor: project.color + '10' }]}>
    <View style={[styles.iconContainer, styles.iconContainerWhite]}>
      <Text style={[styles.icon, { color: project.color }]}>📁</Text>
    </View>
    <View style={styles.content}>
       <Text style={styles.label}>{project.label}</Text>
       <Text style={styles.title} numberOfLines={2}>{project.title}</Text>
    </View>
    <View style={styles.progressContainer}>
       <View style={styles.progressHeader}>
         <Text style={styles.progressLabel}>Progress</Text>
         <Text style={[styles.percentage, { color: project.color }]}>{project.progress}%</Text>
       </View>
       <View style={styles.progressBarBg}>
         <View style={[styles.progressBarFill, { width: `${project.progress}%`, backgroundColor: project.color }]} />
       </View>
    </View>
  </TouchableOpacity>
);

export default ProjectCard;

