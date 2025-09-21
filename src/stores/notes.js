import { defineStore } from 'pinia';
import api from '../services/api';
import { notificationService } from '../services/notification';

export const useNotesStore = defineStore('notes', {
  state: () => ({
    notes: [],
    loading: false,
    error: null
  }),
  actions: {
    async fetchNotes() {
      this.loading = true;
      this.error = null;
      try {
        const response = await api.getNotes();
        console.log('Réponse API complète:', response);
        console.log('Structure de response.data:', Object.keys(response.data));
        console.log('Type de response.data:', typeof response.data);
        
        if (response.data && response.data.notes) {
          console.log('Propriété notes trouvée:', typeof response.data.notes);
          console.log('Est-ce un tableau?', Array.isArray(response.data.notes));
          console.log('Longueur si tableau:', Array.isArray(response.data.notes) ? response.data.notes.length : 'N/A');
          
          if (Array.isArray(response.data.notes)) {
            console.log('Utilisation du tableau response.data.notes');
            this.notes = [...response.data.notes]; 
          } else {
            console.log('notes existe mais n\'est pas un tableau');
            this.notes = [];
          }
        } else if (Array.isArray(response.data)) {
          console.log('response.data est directement un tableau');
          this.notes = [...response.data];
        } else {
          console.log('Format non reconnu, initialisation tableau vide');
          this.notes = [];
        }
        
        console.log('Notes après assignation:', this.notes);
        console.log('Type après assignation:', typeof this.notes);
        console.log('Est-ce un tableau après assignation?', Array.isArray(this.notes));
        console.log('Longueur finale:', this.notes.length);
        
        if (this.notes.length === 0) {
          console.log('Aucune note depuis l\'API, essai avec localStorage');
          const localNotes = JSON.parse(localStorage.getItem('postits') || '[]');
          if (localNotes.length > 0) {
            console.log('Notes trouvées dans localStorage:', localNotes.length);
            this.notes = localNotes;
          }
        }
      } catch (err) {
        this.error = err.message || 'Erreur lors de la récupération des notes';
        console.error('Erreur lors de la récupération des notes:', err);
        this.notes = JSON.parse(localStorage.getItem('postits') || '[]');
      } finally {
        this.loading = false;
      }
    },
    
    async fetchNote(id) {
      this.loading = true;
      this.error = null;
      try {
        console.log('Récupération de la note avec ID:', id);
        const response = await api.getNote(id);
        console.log('Réponse API pour la note individuelle:', response);
        
        if (response.data) {
          const note = response.data;
          console.log('Note récupérée de l\'API:', note);
          
          if (note._id || note.id) {
            return note;
          } else {
            this.error = "Format de note invalide";
            console.error("Format de note invalide:", note);
            return null;
          }
        } else {
          this.error = "Aucune note retournée par l'API";
          console.error("Aucune note retournée par l'API");
          return null;
        }
      } catch (err) {
        this.error = err.message || `Erreur lors de la récupération de la note ${id}`;
        console.error(`Erreur lors de la récupération de la note ${id}:`, err);
        
        console.log('Tentative de récupération depuis localStorage');
        const notes = JSON.parse(localStorage.getItem('postits') || '[]');
        
        const localNote = notes.find(note => 
          note.id === id || note._id === id || 
          note.id === parseInt(id) || (note._id && note._id === parseInt(id))
        );
        
        console.log('Note trouvée dans localStorage:', localNote);
        return localNote || null;
      } finally {
        this.loading = false;
      }
    },
    
    async addNote(note) {
      this.loading = true;
      this.error = null;
      try {
        console.log('Note originale à ajouter:', note);
        
        const noteToSend = { ...note };
        if (noteToSend.id) {
          console.log('Suppression de l\'ID généré côté client:', noteToSend.id);
          delete noteToSend.id;
        }
        
        console.log('Note envoyée à l\'API:', noteToSend);
        
        const response = await api.createNote(noteToSend);
        console.log('Réponse de l\'API après création:', response);
        
        let newNote;
        if (response.data && response.data.note_id) {
          newNote = {
            ...noteToSend,
            _id: response.data.note_id,
            id: response.data.note_id
          };
        } else if (response.data) {
          newNote = response.data;
        } else {
          throw new Error('Format de réponse API non reconnu');
        }
        
        console.log('Nouvelle note créée:', newNote);
        
        if (!Array.isArray(this.notes)) {
          console.log('Les notes ne sont pas un tableau, initialisation');
          this.notes = [];
        }
        
        this.notes.unshift(newNote);
        this.saveToLocalStorage();
        return newNote;
      } catch (err) {
        this.error = err.message || 'Erreur lors de l\'ajout de la note';
        console.error('Erreur lors de l\'ajout de la note:', err);
        
        if (!Array.isArray(this.notes)) this.notes = [];
        
        const localNote = { 
          ...note, 
          id: Date.now().toString(),
          _id: Date.now().toString() 
        };
        this.notes.unshift(localNote);
        this.saveToLocalStorage();
        return localNote;
      } finally {
        this.loading = false;
      }
    },
    
    async updateNote(id, data) {
      this.loading = true;
      this.error = null;
      try {
        console.log('Mise à jour de la note:', id, data);
        
        const formattedData = {
          ...data,
          content: Array.isArray(data.content) ? data.content : [data.content]
        };
        
        const response = await api.updateNote(id, formattedData);
        console.log('Réponse de l\'API après mise à jour:', response);
        
        const index = this.notes.findIndex(note => 
          note.id === id || note._id === id || 
          note.id === parseInt(id) || (note._id && note._id === parseInt(id))
        );
        
        if (index !== -1) {
          this.notes[index] = { 
            ...this.notes[index], 
            ...formattedData
          };
          this.saveToLocalStorage();
          return this.notes[index];
        } else {
          throw new Error('Note non trouvée dans le store');
        }
      } catch (err) {
        this.error = err.message || `Erreur lors de la mise à jour de la note ${id}`;
        console.error(`Erreur lors de la mise à jour de la note ${id}:`, err);
        
        // Fallback à localStorage
        const notes = JSON.parse(localStorage.getItem('postits') || '[]');
        const index = notes.findIndex(note => 
          note.id === id || note._id === id || 
          note.id === parseInt(id) || (note._id && note._id === parseInt(id))
        );
        
        if (index !== -1) {
          notes[index] = { ...notes[index], ...data };
          localStorage.setItem('postits', JSON.stringify(notes));
          
          // Mise à jour du state
          const stateIndex = this.notes.findIndex(note => 
            note.id === id || note._id === id || 
            note.id === parseInt(id) || (note._id && note._id === parseInt(id))
          );
          
          if (stateIndex !== -1) {
            this.notes[stateIndex] = { ...this.notes[stateIndex], ...data };
          }
          
          return notes[index];
        }
        return null;
      } finally {
        this.loading = false;
      }
    },
    
    async deleteNote(id) {
      this.loading = true;
      this.error = null;
      try {
        console.log('Suppression de la note:', id);
        await api.deleteNote(id);
        
        this.notes = this.notes.filter(note => 
          note.id !== id && note._id !== id && 
          note.id !== parseInt(id) && (note._id !== parseInt(id))
        );
        
        this.saveToLocalStorage();
        return true;
      } catch (err) {
        this.error = err.message || `Erreur lors de la suppression de la note ${id}`;
        console.error(`Erreur lors de la suppression de la note ${id}:`, err);
        
        // Fallback à localStorage
        const notes = JSON.parse(localStorage.getItem('postits') || '[]');
        const newNotes = notes.filter(note => 
          note.id !== id && note._id !== id && 
          note.id !== parseInt(id) && (note._id !== parseInt(id))
        );
        
        localStorage.setItem('postits', JSON.stringify(newNotes));
        this.notes = this.notes.filter(note => 
          note.id !== id && note._id !== id && 
          note.id !== parseInt(id) && (note._id !== parseInt(id))
        );
        
        return true;
      } finally {
        this.loading = false;
      }
    },
    
    async deleteAll() {
      try {
        this.notes = [];
        localStorage.setItem('postits', JSON.stringify([]));
        return true;
      } catch (err) {
        notificationService.error('Erreur lors de la suppression de tous les post-its');
        console.error('Erreur lors de la suppression de tous les post-its:', err);
        return false;
      }
    },
    
    saveToLocalStorage() {
      localStorage.setItem('postits', JSON.stringify(this.notes));
    }
  }
});