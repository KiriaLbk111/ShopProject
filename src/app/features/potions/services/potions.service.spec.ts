import { TestBed } from '@angular/core/testing';
import { PotionsService } from './potions.service';
import { OrderPotionModel } from '../models/order-potion.models';

describe('PotionsService', () => {
  let service: PotionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PotionsService]
    });
    service = TestBed.inject(PotionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('addOrder', () => {
    it('should add a new order to orderedPotions array', () => {
      // Подготовка
      const initialCount = service.getOrderedPotions().length;
      const newOrder: OrderPotionModel = {
        id: 1,
        name: 'Alice',
        orderDate: new Date('2026-01-15'),
        readyDate: new Date('2026-01-15'),
        deliveryAddress: 'Moscow, Tverskaya 1',
        deliveryMethod: 'Courier',
        paymentMethod: 'cash'
      };

      // Действие
      service.addOrder(newOrder);

      // Проверка
      const orders = service.getOrderedPotions();
      expect(orders.length).toBe(initialCount + 1);
      expect(orders).toContain(newOrder);
      expect(orders[orders.length - 1]).toEqual(newOrder);
    });
  });
});