import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import AllPostView from '@/views/AllPostView.vue';
import { useNotesStore } from '@/stores/notes';
import HeaderBar from '@/components/HeaderBar.vue';
import PostCard from '@/components/PostCard.vue';
import PostModal from '@/components/PostModal.vue';
import api from '@/services/api';

jest.mock('@/services/api', () => ({
  getNotes: jest.fn(),
  getNote: jest.fn(),
  createNote: jest.fn(),
  updateNote: jest.fn(),
  deleteNote: jest.fn()
}));

describe('Intégration - Fonctionnalité Post-it', () => {
  let wrapper;

  beforeEach(() => {
    const pinia = createPinia();
    setActivePinia(pinia);
    
    api.getNotes.mockResolvedValue({
      data: [
        { id: 1, title: 'Note 1', content: 'Contenu 1', color: '#FFD6A5' },
        { id: 2, title: 'Note 2', content: 'Contenu 2', color: '#CAFFBF' }
      ]
    });
    
    api.createNote.mockImplementation((note) => {
      return Promise.resolve({
        data: { ...note, id: Date.now() }
      });
    });
    
    wrapper = mount(AllPostView, {
      global: {
        plugins: [pinia]
      }
    });
    
    useNotesStore();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('charge et affiche la liste des post-its au démarrage', async () => {
    await wrapper.vm.$nextTick();
    
    expect(api.getNotes).toHaveBeenCalledTimes(1);
    
    const cards = wrapper.findAllComponents(PostCard);
    expect(cards.length).toBe(2);
    
    expect(cards[0].props('title')).toBe('Note 1');
    expect(cards[0].props('content')).toBe('Contenu 1');
  });

  it('ouvre le modal de création lorsqu\'on clique sur le bouton "New Post-it"', async () => {
    const headerBar = wrapper.findComponent(HeaderBar);
    
    await headerBar.find('.create-btn').trigger('click');
    
    const modal = wrapper.findComponent(PostModal);
    expect(modal.exists()).toBe(true);
    expect(modal.props('isEdit')).toBe(false);
  });

  it('crée un nouveau post-it lorsqu\'on soumet le formulaire dans le modal', async () => {
    await wrapper.findComponent(HeaderBar).find('.create-btn').trigger('click');
    
    const modal = wrapper.findComponent(PostModal);
    await modal.find('input[type="text"]').setValue('Nouvelle Note');
    await modal.find('textarea').setValue('Nouveau Contenu');
    
    await modal.find('form').trigger('submit');
    
    expect(api.createNote).toHaveBeenCalledWith(expect.objectContaining({
      title: 'Nouvelle Note',
      content: 'Nouveau Contenu'
    }));
    
    await wrapper.vm.$nextTick();
    expect(wrapper.findComponent(PostModal).exists()).toBe(false);
  });
});