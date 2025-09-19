import { mount } from '@vue/test-utils';
import ConfirmationDialog from '@/components/ConfirmationDialog.vue';

describe('ConfirmationDialog.vue', () => {
  const defaultProps = {
    title: 'Confirmation de test',
    message: 'Êtes-vous sûr de vouloir effectuer cette action ?',
    confirmText: 'Confirmer'
  };

  it('devrait afficher correctement le titre et le message', () => {
    const wrapper = mount(ConfirmationDialog, {
      props: defaultProps
    });

    expect(wrapper.find('.confirmation-header h3').text()).toBe(defaultProps.title);
    expect(wrapper.find('.confirmation-body p').text()).toBe(defaultProps.message);
  });

  it('devrait utiliser le texte de confirmation personnalisé', () => {
    const wrapper = mount(ConfirmationDialog, {
      props: defaultProps
    });

    expect(wrapper.find('.confirm-btn').text()).toBe(defaultProps.confirmText);
  });

  it('devrait émettre l\'événement confirm lorsqu\'on clique sur le bouton de confirmation', async () => {
    const wrapper = mount(ConfirmationDialog, {
      props: defaultProps
    });

    await wrapper.find('.confirm-btn').trigger('click');
    expect(wrapper.emitted().confirm).toBeTruthy();
    expect(wrapper.emitted().confirm.length).toBe(1);
  });

  it('devrait émettre l\'événement cancel lorsqu\'on clique sur le bouton d\'annulation', async () => {
    const wrapper = mount(ConfirmationDialog, {
      props: defaultProps
    });

    await wrapper.find('.cancel-btn').trigger('click');
    expect(wrapper.emitted().cancel).toBeTruthy();
    expect(wrapper.emitted().cancel.length).toBe(1);
  });
});