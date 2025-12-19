import { PRIORITY_LEVELS } from './constants';

export const sortTasks = (tasks) => {
  return tasks.sort((a, b) => {
    // 1. Sort by completion status (Active first, Completed last)
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    
    // 2. Sort by last modified date (Newest updated/created first)
    // Use updatedAt if available, otherwise createdAt
    const dateA = new Date(a.updatedAt || a.createdAt);
    const dateB = new Date(b.updatedAt || b.createdAt);
    
    return dateB - dateA;
  });
};

export const filterTasksBySearch = (tasks, query) => {
  if (!query) return tasks;
  const lowerQuery = query.toLowerCase();
  return tasks.filter(task => 
    task.title?.toLowerCase().includes(lowerQuery) || 
    task.description?.toLowerCase().includes(lowerQuery)
  );
};

export const filterTasksByStatus = (tasks, filter) => {
  switch (filter) {
    case 'Active':
      return tasks.filter(task => !task.completed);
    case 'Completed':
      return tasks.filter(task => task.completed);
    default:
      return tasks;
  }
};

export const getTaskStats = (tasks) => {
  return {
    active: tasks.filter(t => !t.completed).length,
    completed: tasks.filter(t => t.completed).length,
    total: tasks.length
  };
};

export const getRelativeTime = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);
  
  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  return date.toLocaleDateString();
};

export const getPriorityColor = (priority) => {
  // This might be duplicate logic with theme/screens but good for utils
  // We need to import colors if we return hex codes, but usually utils return logic
  // Let's defer to the component for actual colors or import theme here.
  // For now simple string return or we import colors
  return '#4A90E2'; // Fallback
};

export const truncateText = (text, maxLength) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substr(0, maxLength) + '...';
};
