import axios from 'axios';
import { notificationService } from './notification';

const apiClient = axios.create({
  baseURL: 'https://post-it.epi-bluelock.bj/',
  headers: {
    'Content-Type': 'application/json',
  }
});

export default {
  // recupNotes
  async getNotes() {
    try {
      return await apiClient.get('/notes');
    } catch (error) {
      notificationService.error('Erreur lors de la récupération des notes');
      console.error('Erreur lors de la récupération des notes:', error);
      throw error;
    }
  },
  
  // noteParID 
  async getNote(id) {
    try {
      return await apiClient.get(`/notes/${id}`);
    } catch (error) {
      notificationService.error('Erreur lors de la récupération de la note');
      console.error('Erreur lors de la récupération de la note:', error);
      throw error;
    }
  },
  
  // creerpostit
  async createNote(note) {
    console.log('Données originales à envoyer à l\'API:', note);
    
    const formattedNote = {
      title: note.title,
      content: Array.isArray(note.content) ? note.content : [note.content]
    };
    
    if (note.color) {
      formattedNote.color = note.color;
    }
    
    console.log('Données formatées pour l\'API:', formattedNote);
    
    try {
      return await apiClient.post('/notes', formattedNote);
    } catch (error) {
      notificationService.error('Erreur lors de la création de la note');
      console.error('Erreur lors de la création de la note:', error);
      throw error;
    }
  },
  
  // Mettre à jour une note existante
  async updateNote(id, note) {
  
    const formattedNote = {
      title: note.title,
      content: Array.isArray(note.content) ? note.content : [note.content]
    };
    
    if (note.color) {
      formattedNote.color = note.color;
    }
    
    console.log('Données de mise à jour formatées:', formattedNote);
    console.log('URL pour la mise à jour:', `/notes/${id}`);
    
    try {
      const response = await apiClient.put(`/notes/${id}`, formattedNote);
      console.log('Réponse réussie de l\'API:', response.data);
      return response;
    } catch (error) {
      notificationService.error('Erreur lors de la mise à jour de la note');
      console.error('Erreur lors de la mise à jour de la note:', error);
      console.error('Détails de la requête:', {
        url: `/notes/${id}`,
        data: formattedNote,
        error: error.response ? error.response.data : 'Pas de données de réponse'
      });
      throw error;
    }
  },
  
  // supprimernote
  async deleteNote(id) {
    try {
      return await apiClient.delete(`/notes/${id}`);
    } catch (error) {
      notificationService.error('Erreur lors de la suppression de la note');
      console.error('Erreur lors de la suppression de la note:', error);
      throw error;
    }
  }
};