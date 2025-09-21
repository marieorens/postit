<template>
  <div class="notifications-container">
    <NotificationItem
      v-for="notification in notifications"
      :key="notification.id"
      :message="notification.message"
      :type="notification.type"
      :duration="notification.duration"
      :show="notification.show"
      @close="closeNotification(notification.id)"
    />
  </div>
</template>

<script>
import { computed } from 'vue';
import NotificationItem from './Notification.vue';
import { notificationService } from '../services/notification';

export default {
  name: 'NotificationsContainer',
  components: {
    NotificationItem
  },
  setup() {
    const notifications = computed(() => notificationService.getAll());
    
    const closeNotification = (id) => {
      notificationService.close(id);
    };
    
    return {
      notifications,
      closeNotification
    };
  }
};
</script>

<style scoped>
.notifications-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1050;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>