export const API_BASE_URL = 'https://60a21a08745cd70017576014.mockapi.io/api/v1';

export const PRIORITY_LEVELS = {
  HIGH: 'High',
  MEDIUM: 'Medium',
  LOW: 'Low',
};

export const FILTER_STATUS = {
  ALL: 'All',
  ACTIVE: 'Active',
  COMPLETED: 'Completed',
};

export const FILTER_OPTIONS = {
  ALL: 'All',
  ACTIVE: 'Active',
  COMPLETED: 'Completed',
};

export const SUCCESS_MESSAGES = {
  TASK_COMPLETED: 'Task marked as completed',
  TASK_UNCOMPLETED: 'Task marked as active',
  TASK_DELETED: 'Task deleted successfully',
};

export const ERROR_MESSAGES = {
  LOAD_FAILED: 'Failed to load tasks',
  NETWORK_ERROR: 'Network error. Please check your connection.',
  UPDATE_FAILED: 'Failed to update task',
  DELETE_FAILED: 'Failed to delete task',
};

export const TASK_GROUPS = [
  { id: '1', title: 'Office Project', icon: '💼', tasks: '23 Tasks', progress: 70, color: '#7C3AED' },
  { id: '2', title: 'Personal Project', icon: '👤', tasks: '30 Tasks', progress: 52, color: '#EC4899' },
  { id: '3', title: 'Daily Study', icon: '📚', tasks: '30 Tasks', progress: 87, color: '#F59E0B' },
];
