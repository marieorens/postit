import { mount } from '@vue/test-utils';
import HeaderBar from '@/components/HeaderBar.vue';

describe('HeaderBar.vue', () => {
  it('affiche correctement le logo et le titre de l\'application', () => {
    const wrapper = mount(HeaderBar);
    
    expect(wrapper.find('.logo img').exists()).toBe(true);
    expect(wrapper.find('.app-name').text()).toBe('Post-it');
  });

  it('contient les boutons pour créer et supprimer des post-its', () => {
    const wrapper = mount(HeaderBar);
    
    const createBtn = wrapper.find('.create-btn');
    const deleteBtn = wrapper.find('.delete-btn');
    
    expect(createBtn.exists()).toBe(true);
    expect(deleteBtn.exists()).toBe(true);
    expect(createBtn.text()).toContain('New Post-it');
    expect(deleteBtn.text()).toContain('Delete All');
  });

  it('émet l\'événement create lorsqu\'on clique sur le bouton de création', async () => {
    const wrapper = mount(HeaderBar);
    
    await wrapper.find('.create-btn').trigger('click');
    
    expect(wrapper.emitted().create).toBeTruthy();
    expect(wrapper.emitted().create.length).toBe(1);
  });

  it('émet l\'événement deleteAll lorsqu\'on clique sur le bouton de suppression', async () => {
    const wrapper = mount(HeaderBar);
    
    await wrapper.find('.delete-btn').trigger('click');
    
    expect(wrapper.emitted().deleteAll).toBeTruthy();
    expect(wrapper.emitted().deleteAll.length).toBe(1);
  });

  it('affiche la barre de recherche si elle existe', () => {
    const wrapper = mount(HeaderBar);
    
    const searchInput = wrapper.find('input[type="search"]');
    if (searchInput.exists()) {
      expect(searchInput.attributes('placeholder')).toContain('Rechercher');
    }
  });
});