<template>
  <div class="post-details-container">
    <header class="header-bar">
      <div class="logo">
        <img
          src="https://cdn.pixabay.com/photo/2016/03/31/19/56/sticky-note-1292817_1280.png"
          alt="Post-it Logo"
        />
        <span class="app-name">Details 👻</span>
      </div>
      <div class="actions">
        <button class="back-btn" @click="goBack">Retour</button>
        <button class="edit-btn" @click="editNote" v-if="note">Modifier</button>
        <button class="delete-btn" @click="deleteNote" v-if="note">Supprimer</button>
      </div>
    </header>
    
    <main>
      <div v-if="loading" class="loading-indicator">
        <div class="spinner"></div>
        <p>Chargement du post-it...</p>
      </div>
      
      <div v-else-if="error" class="error-message">
        <p>{{ error }}</p>
        <button @click="fetchNote" class="retry-btn">Réessayer</button>
        <button @click="goBack" class="back-btn">Retour aux post-its</button>
      </div>
      
      <div v-else-if="note" class="card" :style="{ backgroundColor: note.color || '#FFD6A5' }">
        <h2>{{ note.title }}</h2>
        <p class="description">{{ formattedContent }}</p>
      </div>
      
      <div v-else class="not-found">
        <p>Ce post-it n'existe pas ou a été supprimé.</p>
        <button @click="goBack" class="back-btn">Retour aux post-its</button>
      </div>
    </main>
    
    <div v-if="showModal" class="modal-overlay">
      <PostModal
        :isEdit="true"
        :title="note.title"
        :content="formattedContent"
        @close="closeModal"
        @submit="handleModalSubmit"
      />
    </div>
    
    <div v-if="showConfirmation">
      <ConfirmationDialog
        title="Confirmer la suppression"
        message="Êtes-vous sûr de vouloir supprimer ce post-it ?"
        confirmText="Supprimer"
        @confirm="confirmDelete"
        @cancel="showConfirmation = false"
      />
    </div>
  </div>
</template>

<script>
import { useNotesStore } from '../stores/notes';
import { useRoute, useRouter } from 'vue-router';
import PostModal from './PostModal.vue';
import ConfirmationDialog from './ConfirmationDialog.vue';
import { notificationService } from '../services/notification';

export default {
  name: "PostDetails",
  components: {
    PostModal,
    ConfirmationDialog
  },
  data() {
    return {
      note: null,
      loading: false,
      error: null,
      showModal: false,
      showConfirmation: false,
      route: null,
      router: null,
      notesStore: null
    };
  },
  computed: {
    formattedContent() {
      if (this.note && this.note.content) {
        if (Array.isArray(this.note.content)) {
          return this.note.content.join('\n');
        }
        return this.note.content;
      }
      return '';
    }
  },
  created() {
    this.route = useRoute();
    this.router = useRouter();
    this.notesStore = useNotesStore();
    this.fetchNote();
  },
  methods: {
    async fetchNote() {
      this.loading = true;
      this.error = null;
      try {
        const id = this.route.params.id;
        console.log('Chargement du post-it avec ID:', id);
        
        this.note = await this.notesStore.fetchNote(id);
        console.log('Réponse du post-it:', this.note);
        
        if (!this.note) {
          this.error = "Post-it introuvable";
        }
      } catch (err) {
        this.error = err.message || "Erreur lors du chargement du post-it";
        console.error('Erreur lors du chargement du post-it:', err);
      } finally {
        this.loading = false;
      }
    },
    goBack() {
      this.router.push('/all');
    },
    editNote() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    deleteNote() {
      this.showConfirmation = true;
    },
    
    async confirmDelete() {
      try {
        const id = this.note._id || this.note.id;
        await this.notesStore.deleteNote(id);
        notificationService.success('Post-it supprimé avec succès');
        this.router.push('/all');
      } catch (err) {
        console.error('Erreur lors de la suppression:', err);
        notificationService.error('Erreur lors de la suppression du post-it');
      } finally {
        this.showConfirmation = false;
      }
    },
    async handleModalSubmit({ title, content }) {
      try {
        const id = this.note._id || this.note.id;
        const formattedContent = Array.isArray(content) ? content : [content];
        await this.notesStore.updateNote(id, { 
          title, 
          content: formattedContent 
        });
        this.showModal = false;
        notificationService.success('Post-it mis à jour avec succès');
        this.fetchNote(); 
      } catch (err) {
        console.error('Erreur lors de la mise à jour:', err);
        notificationService.error('Erreur lors de la mise à jour du post-it');
      }
    }
  }
};
</script>

<style scoped>
.post-details-container {
  max-width: 1000px;
  margin: 2rem auto;
  padding: 1rem;
}

.header-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #3758f9;
  border-radius: 10px;
  margin-bottom: 2rem;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.logo {
  display: flex;
  align-items: center;
}

.logo img {
  height: 35px;
  margin-right: 1rem;
}

.app-name {
  font-size: 1.4rem;
  font-weight: bold;
  color: #333;
}

.actions {
  display: flex;
  gap: 1rem;
}

.back-btn, .edit-btn, .delete-btn, .retry-btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.back-btn {
  background-color: #e9ecef;
  color: #495057;
  font-family: 'Poppins', Courier, monospace;
  
}

.edit-btn {
  background-color: #0e7f06;
  color: white;
  font-family: 'Poppins', Courier, monospace;
}

.delete-btn {
  background-color: #dc3545;
  color: white;
  font-family: 'Poppins', Courier, monospace;
}

.retry-btn {
  background-color: #3758f9;
  color: white;
  margin-top: 1rem;
}

.back-btn:hover {
  background-color: #dee2e6;
}

.edit-btn:hover {
  background-color: #2945cc;
}

.delete-btn:hover {
  background-color: #c82333;
}

.retry-btn:hover {
  background-color: #2945cc;
}

.card {
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  background-color: #FFD6A5;
}

.card h2 {
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: #333;
}

.description {
  font-size: 1.2rem;
  line-height: 1.6;
  color: #333;
  white-space: pre-wrap;
}

.not-found {
  text-align: center;
  padding: 3rem;
  background-color: #f8f9fa;
  border-radius: 10px;
}

.not-found p {
  font-size: 1.2rem;
  color: #6c757d;
  margin-bottom: 1.5rem;
}

.loading-indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 5px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top-color: #3758f9;
  animation: spin 1s ease-in-out infinite;
  margin-bottom: 1.5rem;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.error-message {
  background-color: #fff3f3;
  color: #e53935;
  padding: 2rem;
  border-radius: 10px;
  text-align: center;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
</style>