<template>
  <transition name="fade">
    <div class="confirmation-overlay">
      <div class="confirmation-dialog">
        <div class="confirmation-header">
          <h3>{{ title }}</h3>
        </div>
        <div class="confirmation-body">
          <p>{{ message }}</p>
        </div>
        <div class="confirmation-actions">
          <button class="cancel-btn" @click="$emit('cancel')">Annuler</button>
          <button class="confirm-btn" @click="$emit('confirm')">{{ confirmText }}</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'ConfirmationDialog',
  props: {
    title: {
      type: String,
      default: 'Confirmation'
    },
    message: {
      type: String,
      required: true
    },
    confirmText: {
      type: String,
      default: 'Confirmer'
    }
  },
  emits: ['confirm', 'cancel']
};
</script>

<style scoped>
.confirmation-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1100;
}

.confirmation-dialog {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  width: 90%;
  max-width: 400px;
  overflow: hidden;
  margin: 1rem;
}

@media (max-width: 480px) {
  .confirmation-dialog {
    width: 95%;
    max-width: 320px;
    border-radius: 6px;
    margin: 0.5rem;
  }
  
  .confirmation-header {
    padding: 12px;
  }
  
  .confirmation-header h3 {
    font-size: 16px;
  }
  
  .confirmation-body {
    padding: 16px 12px;
  }
  
  .confirmation-actions {
    padding: 8px 12px 12px;
    flex-direction: column-reverse;
    gap: 8px;
  }
  
  .cancel-btn, .confirm-btn {
    width: 100%;
    padding: 10px 16px;
  }
}

@media (min-width: 481px) and (max-width: 768px) {
  .confirmation-dialog {
    width: 85%;
    max-width: 380px;
  }
}

.confirmation-header {
  padding: 16px;
  border-bottom: 1px solid #e8e8e8;
}

.confirmation-header h3 {
  margin: 0;
  font-size: 18px;
  color: #333;
}

.confirmation-body {
  padding: 20px 16px;
}

.confirmation-body p {
  margin: 0;
  color: #666;
  line-height: 1.5;
}

.confirmation-actions {
  padding: 10px 16px 16px;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.cancel-btn, .confirm-btn {
  padding: 8px 16px;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  border: none;
}

.cancel-btn {
  background-color: #f5f5f5;
  color: #666;
}

.confirm-btn {
  background-color: #dc3545;
  color: white;
}

.cancel-btn:hover {
  background-color: #e8e8e8;
}

.confirm-btn:hover {
  background-color: #c82333;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active .confirmation-dialog,
.fade-leave-active .confirmation-dialog {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.fade-enter-from .confirmation-dialog,
.fade-leave-to .confirmation-dialog {
  transform: scale(0.9);
  opacity: 0;
}
</style>