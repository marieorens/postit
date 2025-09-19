import { setActivePinia, createPinia } from 'pinia';
import { useNotesStore } from '@/stores/notes';
import api from '@/services/api';


jest.mock('@/services/api', () => ({
  getNotes: jest.fn(),
  getNote: jest.fn(),
  createNote: jest.fn(),
  updateNote: jest.fn(),
  deleteNote: jest.fn()
}));

describe('Notes Store', () => {
  let store;

  beforeEach(() => {
    setActivePinia(createPinia());
    store = useNotesStore();
    jest.clearAllMocks();
  });

  describe('fetchNotes', () => {
    it('doit mettre à jour les notes quand l\'API répond avec succès', async () => {
      const mockNotes = [
        { id: 1, title: 'Note 1', content: 'Contenu 1', color: '#FFD6A5' },
        { id: 2, title: 'Note 2', content: 'Contenu 2', color: '#CAFFBF' }
      ];
      api.getNotes.mockResolvedValue({ data: mockNotes });

      await store.fetchNotes();

      expect(api.getNotes).toHaveBeenCalledTimes(1);
      expect(store.notes).toEqual(mockNotes);
      expect(store.loading).toBe(false);
      expect(store.error).toBeNull();
    });

    it('doit gérer les erreurs lors de la récupération des notes', async () => {
      const errorMessage = 'Erreur réseau';
      api.getNotes.mockRejectedValue(new Error(errorMessage));

      const mockLocalStorageNotes = [{ id: 3, title: 'Local Note', content: 'Local Content' }];
      jest.spyOn(Storage.prototype, 'getItem').mockReturnValue(JSON.stringify(mockLocalStorageNotes));

      await store.fetchNotes();

      expect(api.getNotes).toHaveBeenCalledTimes(1);
      expect(store.error).toBe(errorMessage);
      expect(store.notes).toEqual(mockLocalStorageNotes);
      expect(store.loading).toBe(false);
    });
  });

  describe('addNote', () => {
    it('doit ajouter une note quand l\'API répond avec succès', async () => {
      const newNote = { title: 'Nouvelle Note', content: 'Nouveau Contenu', color: '#9BF6FF' };
      const savedNote = { ...newNote, id: 123 };
      api.createNote.mockResolvedValue({ data: savedNote });

      jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {});

      const result = await store.addNote(newNote);

      expect(api.createNote).toHaveBeenCalledWith(newNote);
      expect(store.notes).toContainEqual(savedNote);
      expect(localStorage.setItem).toHaveBeenCalled();
      expect(result).toEqual(savedNote);
      expect(store.loading).toBe(false);
      expect(store.error).toBeNull();
    });

    it('doit gérer les erreurs lors de l\'ajout d\'une note', async () => {
      const newNote = { title: 'Nouvelle Note', content: 'Nouveau Contenu' };
      const errorMessage = 'Erreur lors de l\'ajout';
      api.createNote.mockRejectedValue(new Error(errorMessage));

      jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {});

      const result = await store.addNote(newNote);

      expect(api.createNote).toHaveBeenCalled();
      expect(store.error).toBe(errorMessage);
      expect(result.id).toBeDefined();
      expect(store.notes).toContainEqual(result);
      expect(localStorage.setItem).toHaveBeenCalled();
      expect(store.loading).toBe(false);
    });
  });

});