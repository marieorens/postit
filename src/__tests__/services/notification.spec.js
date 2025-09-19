import { notificationService } from '@/services/notification';

describe('Notification Service', () => {
  beforeEach(() => {
    jest.spyOn(notificationService, 'getAll').mockImplementation(() => []);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('devrait pouvoir ajouter une notification', () => {
    const id = notificationService.notify('Test message');
    expect(id).toBeDefined();
  });

  it('devrait ajouter des notifications avec le type correct', () => {
    const successId = notificationService.success('Success message');
    const errorId = notificationService.error('Error message');
    const warningId = notificationService.warning('Warning message');
    const infoId = notificationService.info('Info message');

    expect(successId).toBeDefined();
    expect(errorId).toBeDefined();
    expect(warningId).toBeDefined();
    expect(infoId).toBeDefined();
  });

  it('devrait pouvoir fermer une notification', () => {
    const id = notificationService.notify('Test message');
    const closeSpy = jest.spyOn(notificationService, 'close');
    
    notificationService.close(id);
    
    expect(closeSpy).toHaveBeenCalledWith(id);
  });
});