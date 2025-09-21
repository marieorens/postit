<template>
  <div class="all-posts-container">
    <div :class="['main-content', showModal ? 'blurred' : '']">
      <HeaderBar
        @create="handleCreate"
        @deleteAll="handleDeleteAll"
        @search="handleSearch"
      />

      <div v-if="loading" class="loading-indicator">
        <div class="spinner"></div>
        <p>Chargement des post-its...</p>
      </div>

      <div v-else-if="error" class="error-message">
        <p>{{ error }}</p>
        <button @click="fetchNotes" class="retry-btn">Réessayer</button>
      </div>

      <div
        v-else-if="searchQuery && filteredNotes.length === 0"
        class="no-search-results"
      >
        <p>Aucun post-it ne correspond à votre recherche "{{ searchQuery }}"</p>
        <button @click="clearSearch" class="clear-search-btn">
          Effacer la recherche
        </button>
      </div>

      <div v-else class="grid">
        <div v-for="post in filteredNotes" :key="post.id">
          <PostCard
            :title="post.title"
            :content="post.content"
            :color="post.color || getRandomColor()"
            @edit="openEditModal(post)"
            @details="goToDetails(post)"
          />
        </div>

        <div
          v-if="Array.isArray(filteredNotes) && filteredNotes.length === 0 && !loading"
          class="no-posts"
        >
          <p>Aucun post-it pour le moment. Créez-en un nouveau !</p>
        </div>
      </div>
    </div>
    <div v-if="showModal" class="modal-overlay">
      <PostModal
        :isEdit="modalEdit"
        :title="modalTitle"
        :content="modalContent"
        @close="closeModal"
        @submit="handleModalSubmit"
      />
    </div>
    <div v-if="showConfirmation">
      <ConfirmationDialog
        title="Confirmer la suppression"
        message="Êtes-vous sûr de vouloir supprimer tous les post-its ? Cette action est irréversible."
        confirmText="Supprimer tout"
        @confirm="confirmDeleteAll"
        @cancel="showConfirmation = false"
      />
    </div>
  </div>
</template>

<script setup>
import PostCard from "../components/PostCard.vue";
import HeaderBar from "../components/HeaderBar.vue";
import PostModal from "../components/PostModal.vue";
import ConfirmationDialog from "../components/ConfirmationDialog.vue";
import { useNotesStore } from "../stores/notes";
import { storeToRefs } from "pinia";
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { notificationService } from "../services/notification";

const router = useRouter();
const notesStore = useNotesStore();
const { notes, loading, error } = storeToRefs(notesStore);

const showModal = ref(false);
const modalEdit = ref(false);
const modalTitle = ref("");
const modalContent = ref("");
const modalEditId = ref(null);
const searchQuery = ref("");
const showConfirmation = ref(false);

const filteredNotes = computed(() => {
  if (!searchQuery.value) return notes.value || [];

  const query = searchQuery.value.toLowerCase();
  return Array.isArray(notes.value)
    ? notes.value.filter(
        (note) => note.title.includes(query) || note.content.includes(query)
      )
    : [];
});

onMounted(async () => {
  await fetchNotes();
});

async function fetchNotes() {
  await notesStore.fetchNotes();
  console.log("Notes récupérées:", notes.value);
  console.log("Notes sont-elles un tableau?", Array.isArray(notes.value));
  console.log("Longueur des notes:", notes.value ? notes.value.length : 0);
  console.log("Filtered Notes:", filteredNotes.value);
}

function handleCreate() {
  modalEdit.value = false;
  modalTitle.value = "";
  modalContent.value = "";
  modalEditId.value = null;
  showModal.value = true;
}

function openEditModal(post) {
  modalEdit.value = true;
  modalTitle.value = post.title;
  modalContent.value = post.content;
  modalEditId.value = post.id;
  showModal.value = true;
}

function closeModal() {
  showModal.value = false;
}

function getRandomColor() {
  const colors = [
    "#FFD6A5",
    "#FDFFB6",
    "#CAFFBF",
    "#9BF6FF",
    "#A0C4FF",
    "#BDB2FF",
    "#FFC6FF",
    "#FFFFFC",
    "#F1F8E9",
    "#FFFDE7",
    "#E1F5FE",
    "#F8BBD0",
    "#D1C4E9",
    "#FFECB3",
    "#C8E6C9",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

async function handleModalSubmit({ title, content }) {
  if (!title || !content || !title.trim() || !content.trim()) return;

  try {
    if (modalEdit.value && modalEditId.value !== null) {
      await notesStore.updateNote(modalEditId.value, { title, content });
      notificationService.success("Post-it mis à jour avec succès");
    } else {
      await notesStore.addNote({
        title,
        content,
        color: getRandomColor(),
      });
      notificationService.success("Post-it créé avec succès");
    }
    showModal.value = false;
  } catch (err) {
    console.error("Erreur lors de la soumission du formulaire:", err);
    notificationService.error("Erreur lors de la soumission du formulaire");
  }
}

async function handleDeleteAll() {
  showConfirmation.value = true;
}

async function confirmDeleteAll() {
  try {
    await notesStore.deleteAll();
    notificationService.success("Tous les post-its ont été supprimés");
    showConfirmation.value = false;
  } catch (err) {
    console.error("Erreur lors de la suppression de tous les post-its:", err);
    notificationService.error("Erreur lors de la suppression des post-its");
    showConfirmation.value = false;
  }
}

function goToDetails(post) {
  const postId = post._id || post.id;
  console.log("Navigation vers détails du post-it avec ID:", postId);
  router.push(`/note/${postId}`);
}

function handleSearch(query) {
  searchQuery.value = query;
}

function clearSearch() {
  searchQuery.value = "";
}
</script>

<style scoped>
.all-posts-container {
  max-width: 1100px;
  margin: 2rem auto;
  padding: 1rem;
  position: relative;
}

.all-posts-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('@/assets/postit.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: 300px 300px;
  opacity: 0.05;
  pointer-events: none;
  z-index: -1;
}
.main-content {
  transition: filter 0.3s;
}
.blurred {
  filter: blur(6px) brightness(0.8);
  pointer-events: none;
  user-select: none;
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
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
}

@media (max-width: 480px) {
  .all-posts-container {
    margin: 1rem auto;
    padding: 0.75rem;
  }

  .grid {
    grid-template-columns: 1fr;
    gap: 1rem;
    margin-top: 0.75rem;
  }
}

@media (min-width: 481px) and (max-width: 768px) {
  .all-posts-container {
    margin: 1.5rem auto;
    padding: 0.875rem;
  }

  .grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.25rem;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .grid {
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 1.375rem;
  }
}

@media (min-width: 1025px) {
  .grid {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  }
}
.no-posts {
  grid-column: 1 / -1;
  text-align: center;
  padding: 2rem;
  background-color: #f8f9fa;
  border-radius: 10px;
  margin-top: 1rem;
}
.no-posts p {
  font-size: 1.2rem;
  color: #6c757d;
}

.loading-indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  margin-top: 1rem;
}
.spinner {
  width: 50px;
  height: 50px;
  border: 5px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top-color: #3758f9;
  animation: spin 1s ease-in-out infinite;
  margin-bottom: 1rem;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.error-message {
  background-color: #fff3f3;
  color: #e53935;
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
  margin-top: 1rem;
}
.retry-btn {
  background-color: #e53935;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  margin-top: 0.5rem;
  cursor: pointer;
}
.retry-btn:hover {
  background-color: #c62828;
}

.no-search-results {
  padding: 2rem;
  background-color: #f0f4ff;
  border-radius: 10px;
  text-align: center;
  margin-top: 1rem;
}
.clear-search-btn {
  background-color: #3758f9;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  margin-top: 0.5rem;
  cursor: pointer;
}
.clear-search-btn:hover {
  background-color: #2945cc;
}
</style>
