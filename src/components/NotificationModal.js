import React from 'react';
import { Modal, View, Text, TouchableOpacity, FlatList } from 'react-native';
import { colors } from '../styles/theme';
import Icon from 'react-native-vector-icons/Feather';
import styles from '../styles/NotificationModal.styles';

const NotificationModal = ({ visible, onClose, tasks }) => {
  if (!visible) return null;

  const renderItem = ({ item }) => {
    const dueDate = new Date(item.dueDate);
    const timeDiff = new Date() - dueDate;
    const daysOverdue = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    
    let timeText = 'Overdue';
    if (daysOverdue > 0) timeText += ` by ${daysOverdue} day${daysOverdue > 1 ? 's' : ''}`;
    else timeText += ' today';

    return (
      <View style={styles.taskItem}>
        <View style={[styles.priorityIndicator, { backgroundColor: getPriorityColor(item.priority) }]} />
        <View style={styles.taskContent}>
          <Text style={styles.taskTitle} numberOfLines={1}>{item.title}</Text>
          <Text style={styles.taskTime}>{timeText}</Text>
        </View>
        <Icon name="alert-circle" size={20} color={colors.danger} />
      </View>
    );
  };

  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'high': return colors.danger;
      case 'medium': return colors.warning;
      case 'low': return colors.success;
      default: return colors.textSecondary;
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
      statusBarTranslucent={true}
    >
      <View style={styles.centeredView}>
        <TouchableOpacity style={styles.backdrop} onPress={onClose} activeOpacity={1} />
        <View style={styles.modalView}>
          <View style={styles.header}>
            <Text style={styles.modalTitle}>Notifications</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Icon name="x" size={24} color={colors.textPrimary} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.divider} />

          {tasks.length > 0 ? (
            <>
              <View style={styles.summaryContainer}>
                 <Text style={styles.summaryText}>
                   You have <Text style={styles.highlightText}>{tasks.length} overdue tasks</Text> that need attention.
                 </Text>
              </View>

              <FlatList
                data={tasks}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                style={styles.list}
              />
            </>
          ) : (
            <View style={styles.emptyState}>
              <Icon name="bell-off" size={48} color={colors.textTertiary} />
              <Text style={styles.emptyText}>No new notifications</Text>
              <Text style={styles.emptySubtext}>You're all caught up!</Text>
            </View>
          )}

          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>Got it</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default NotificationModal;
