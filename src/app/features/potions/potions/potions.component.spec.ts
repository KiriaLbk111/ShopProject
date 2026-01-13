import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PotionsComponent } from './potions.component';
import { PotionModel } from '../models/potion.model';
import { Component, Input } from '@angular/core';
import { PotionsService } from '../services/potions.service';
import { MatButtonModule } from '@angular/material/button';
import { By } from '@angular/platform-browser';
import { OrderPotionModel } from '../models/order-potion.models';
import { ReactiveFormsModule } from '@angular/forms';

// Мок-данные
const mockPotions: PotionModel[] = [
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

// Мок-сервис
class MockPotionsService {
  getPotions(): PotionModel[] {
    return mockPotions;
  }
  getPaymentOptions(): { id: string; name: string }[] {
    return [
      { id: 'cash', name: 'Наличные' },
      { id: 'card', name: 'Карта' }
    ];
  }
  getOrderedPotions(): OrderPotionModel[] {
    return [];
  }
}

// Мок-компонент для <app-potions-list>
@Component({
  selector: 'app-potions-list',
  template: '<div class="mock-potions-list"></div>'
})
class MockPotionsListComponent {
  @Input()  data: PotionModel[] = [];
  @Input() columns: string[] = [];
}

describe('PotionsComponent', () => {
  let component: PotionsComponent;
  let fixture: ComponentFixture<PotionsComponent>;
  let potionsService: PotionsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatButtonModule, ReactiveFormsModule],
      declarations: [ PotionsComponent,
        MockPotionsListComponent ],
      providers: [
        { provide: PotionsService, useClass: MockPotionsService }
      ]
    }, )
    .compileComponents();

    fixture = TestBed.createComponent(PotionsComponent);
    component = fixture.componentInstance;
    potionsService = TestBed.inject(PotionsService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load availablePotions from service on init', () => {
    spyOn(potionsService, 'getPotions').and.callThrough();

    fixture.detectChanges();

    expect(potionsService.getPotions).toHaveBeenCalled();
    expect(component.availablePotions).toEqual(mockPotions);
  });

  it('should pass availablePotions to app-potions-list', () => {
    spyOn(potionsService, 'getPotions').and.returnValue(mockPotions);
    fixture.detectChanges();

    const potionsList = fixture.debugElement.query(By.directive(MockPotionsListComponent))
      .componentInstance as MockPotionsListComponent;
    
    expect(potionsList.data).toEqual(mockPotions);
  });

  it('should not show ordered potions list by default', () => {
    fixture.detectChanges();

    const orderedList = fixture.debugElement.queryAll(By.css('.ordered-potions app-potions-list'));
    expect(orderedList.length).toBe(0); // не отображается
    expect(component.isShowOrderedPotions).toBeFalse();
  });

  it('should show ordered potions list after clicking "Show orders" button', () => {
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('.ordered-potions button'));
    button.triggerEventHandler('click', null);

    fixture.detectChanges(); // обновить шаблон после изменения isShowOrderedPotions

    const orderedList = fixture.debugElement.query(By.css('.ordered-potions app-potions-list'));
    expect(orderedList).toBeTruthy();
    expect(component.isShowOrderedPotions).toBeTrue();
  });

  it('should hide ordered potions list after second click on "Show orders" button', () => {
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('.ordered-potions button'));

    // Первый клик — показать
    button.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.isShowOrderedPotions).toBeTrue();

    // Второй клик — скрыть
    button.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.isShowOrderedPotions).toBeFalse();

    const orderedList = fixture.debugElement.queryAll(By.css('.ordered-potions app-potions-list'));
    expect(orderedList.length).toBe(0);
  });

   it('should create dynamic modal component when "Order" button is clicked', () => {
    // Находим кнопку "Order"
    fixture.detectChanges();
    const orderButton = fixture.debugElement.query(By.css('.order-button button'));
    expect(orderButton).toBeTruthy();

    // Кликаем
    orderButton.triggerEventHandler('click', null);

    expect(component.potionRef).toBeTruthy();
    expect(component.potionRef?.instance).toBeTruthy();
  });
});
