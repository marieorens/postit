import { mount } from '@vue/test-utils';
import PostCard from '@/components/PostCard.vue';

jest.mock('@/services/notification', () => ({
  notificationService: {
    success: jest.fn(),
    error: jest.fn(),
    warning: jest.fn(),
    info: jest.fn()
  }
}));

describe('PostCard.vue', () => {
  const defaultProps = {
    title: 'Test Title',
    content: 'Test Content',
    color: '#7588e8'
  };

  it('affiche correctement le titre et le contenu', () => {
    const wrapper = mount(PostCard, {
      props: defaultProps
    });

    expect(wrapper.find('.title').text()).toBe(defaultProps.title);
    expect(wrapper.find('.content').text()).toBe(defaultProps.content);
  });

  it('utilise la couleur de fond fournie en props', () => {
    const wrapper = mount(PostCard, {
      props: defaultProps
    });

    const cardElement = wrapper.find('.postcard');
    const style = cardElement.attributes('style');
    expect(style).toContain('background-color:');
  });

  it('gère correctement le contenu quand il est un tableau', () => {
    const propsWithArrayContent = {
      ...defaultProps,
      content: ['Ligne 1', 'Ligne 2', 'Ligne 3']
    };

    const wrapper = mount(PostCard, {
      props: propsWithArrayContent
    });

    expect(wrapper.find('.content').text()).toBe('Ligne 1\nLigne 2\nLigne 3');
  });

  it('émet l\'événement details lorsqu\'on clique sur la carte', async () => {
    const wrapper = mount(PostCard, {
      props: defaultProps
    });

    await wrapper.find('.postcard').trigger('click');
    expect(wrapper.emitted().details).toBeTruthy();
    expect(wrapper.emitted().details.length).toBe(1);
  });
});