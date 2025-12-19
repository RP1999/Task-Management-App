import { PRIORITY_LEVELS } from './constants';

export const sortTasks = (tasks) => {
  return tasks.sort((a, b) => {
    // Sort by completion status (active first)
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    
    // Sort by priority (High > Medium > Low)
    const priorityOrder = { [PRIORITY_LEVELS.HIGH]: 3, [PRIORITY_LEVELS.MEDIUM]: 2, [PRIORITY_LEVELS.LOW]: 1 };
    const pA = priorityOrder[a.priority] || 0;
    const pB = priorityOrder[b.priority] || 0;
    
    if (pA !== pB) {
      return pB - pA;
    }
    
    // Sort by date (newest first)
    return new Date(b.createdAt) - new Date(a.createdAt);
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
