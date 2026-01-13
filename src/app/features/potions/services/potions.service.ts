import { Injectable } from '@angular/core'; 
import { PotionModel } from '../models/potion.model';
import { OrderPotionModel } from '../models/order-potion.models';

@Injectable()
export class PotionsService {
  private availablePotions: PotionModel[] = [
    {
      id: 1,
      name: 'Зелье удачи',
      price: 150,
      ingredients: 'Корица, хвост поросёнка, роза, пустырник'
    },
    {
      id: 2,
      name: 'Зелье зависти',
      price: 100,
      ingredients: 'Укроп, мелисса, гвоздь, улыбка'
    },
    {
      id: 3,
      name: 'Зелье силы',
      price: 180,
      ingredients: 'Протеин, гантеля, крапива'
    },
    {
      id: 4,
      name: 'Зелье молодости',
      price: 230,
      ingredients: 'Одуванчик, уксус, молоко, оливковое масло'
    },
    {
      id: 5,
      name: 'Зелье старости',
      price: 50,
      ingredients: 'Хруст сустава, ландыш, коляска'
    },
    {
      id: 6,
      name: 'Зелье богатства',
      price: 160,
      ingredients: 'Сундук, покрывало, лосось'
    }
  ];
  private paymentOptions = [
    { id: 'cash', name: 'Наличные' },
    { id: 'card', name: 'Карта' }
  ];
  private orderedPotions: OrderPotionModel[] = [];

  getPotions(): PotionModel[] {
    return this.availablePotions;
  }

  addOrder(order: OrderPotionModel) {
    this.orderedPotions.push(order);
  }

  getOrderedPotions(): OrderPotionModel[] {
    return this.orderedPotions;
  }

  getPaymentOptions(): {id: string; name: string;}[] {
    return this.paymentOptions;
  }
}