import { reactive } from 'vue';

const state = reactive({
  notifications: [],
  nextId: 1
});

export const notificationService = {
  notify(message, type = 'info', duration = 3000) {
    const id = state.nextId++;
    const notification = { id, message, type, duration, show: true };
    
    state.notifications.push(notification);
    
    if (duration > 0) {
      setTimeout(() => {
        this.close(id);
      }, duration);
    }
    
    return id;
  },
  
  close(id) {
    const index = state.notifications.findIndex(n => n.id === id);
    if (index !== -1) {
      state.notifications.splice(index, 1);
    }
  },
  
  success(message, duration) {
    return this.notify(message, 'success', duration);
  },
  
  error(message, duration) {
    return this.notify(message, 'error', duration);
  },
  
  warning(message, duration) {
    return this.notify(message, 'warning', duration);
  },
  
  info(message, duration) {
    return this.notify(message, 'info', duration);
  },
  
  getAll() {
    return state.notifications;
  }

};

export default notificationService;