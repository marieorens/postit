import { mount } from '@vue/test-utils';
import PostModal from '@/components/PostModal.vue';

describe('PostModal.vue', () => {
  const defaultProps = {
    isEdit: false,
    title: '',
    content: ''
  };

  it('affiche le titre approprié selon le mode (création ou édition)', () => {
    const createWrapper = mount(PostModal, {
      props: defaultProps
    });
    expect(createWrapper.find('.modal-header h3').text()).toBe('Créer un post-it');

    const editWrapper = mount(PostModal, {
      props: {
        ...defaultProps,
        isEdit: true
      }
    });
    expect(editWrapper.find('.modal-header h3').text()).toBe('Modifier le post-it');
  });

  it('préremplit les champs avec les valeurs fournies en props', async () => {
    const testProps = {
      isEdit: true,
      title: 'Test Title',
      content: 'Test Content'
    };
    
    const wrapper = mount(PostModal, {
      props: testProps
    });
    
    await wrapper.vm.$nextTick(); 
    
    const titleInput = wrapper.find('input[type="text"]');
    const contentTextarea = wrapper.find('textarea');
    
    expect(titleInput.element.value).toBe(testProps.title);
    expect(contentTextarea.element.value).toBe(testProps.content);
  });

  it('émet l\'événement close lorsqu\'on clique sur le bouton de fermeture', async () => {
    const wrapper = mount(PostModal, {
      props: defaultProps
    });
    
    await wrapper.find('.close-btn').trigger('click');
    
    expect(wrapper.emitted().close).toBeTruthy();
    expect(wrapper.emitted().close.length).toBe(1);
  });

  it('émet l\'événement submit avec les données du formulaire lors de la soumission', async () => {
    const wrapper = mount(PostModal, {
      props: defaultProps
    });
    
    const titleInput = wrapper.find('input[type="text"]');
    const contentTextarea = wrapper.find('textarea');
    const form = wrapper.find('form');
    
    await titleInput.setValue('New Title');
    await contentTextarea.setValue('New Content');
    await form.trigger('submit');
    
    expect(wrapper.emitted().submit).toBeTruthy();
    expect(wrapper.emitted().submit[0][0]).toEqual({
      title: 'New Title',
      content: 'New Content'
    });
  });
});