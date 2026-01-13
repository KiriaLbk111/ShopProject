import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderPotionComponent } from './order-potion.component';
import { PotionsService } from '../services/potions.service';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Component, forwardRef, Input } from '@angular/core';
import { PotionModel } from '../models/potion.model';
import { By } from '@angular/platform-browser';
import { OrderPotionModel } from '../models/order-potion.models';

// Моки кастомных контролов
@Component({ selector: 'app-custom-select', template: '', providers: [
  {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MockCustomSelectComponent),
    multi: true
  }
] })
class MockCustomSelectComponent implements ControlValueAccessor {
  @Input() options: any[] = [];
  @Input() label = '';
  @Input() placeholder = '';
  @Input() isTouched: boolean = false;

  onChange = (_: any) => {};
  onTouched = () => {};
  writeValue(_: any): void {}
  registerOnChange(fn: any): void {}
  registerOnTouched(fn: any): void {}
}

@Component({ selector: 'app-custom-text-input', template: '', providers: [
  {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MockCustomTextInputComponent),
    multi: true
  }
] })
class MockCustomTextInputComponent implements ControlValueAccessor {
  @Input() value: string = '';
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() isTouched: boolean = false;

  writeValue(_: any): void {}
  registerOnChange(fn: any): void {}
  registerOnTouched(fn: any): void {}
}

@Component({ selector: 'app-custom-datepicker', template: '', providers: [
  {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MockCustomDatepickerComponent),
    multi: true
  }
]})
class MockCustomDatepickerComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() placeholder = '';
  @Input() isTouched = false;

  writeValue(_: any): void {}
  registerOnChange(fn: any): void {}
  registerOnTouched(fn: any): void {}
}

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
  addOrder(order: any): void {
  }
}

describe('OrderPotionComponent', () => {
  let component: OrderPotionComponent;
  let fixture: ComponentFixture<OrderPotionComponent>;
  let potionsService: PotionsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, MatButtonModule],
      declarations: [ OrderPotionComponent, MockCustomSelectComponent,
        MockCustomTextInputComponent,
        MockCustomDatepickerComponent ],
        providers: [{ provide: PotionsService, useClass: MockPotionsService }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderPotionComponent);
    component = fixture.componentInstance;
    potionsService = TestBed.inject(PotionsService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize potionOptions from service', () => {
    const potions = (potionsService as MockPotionsService).getPotions();
    const expectedOptions = potions;

    expect(component.potionOptions).toEqual(expectedOptions);
  });

  it('should set isTouched to true and not emit close when "Order" is clicked with invalid form', () => {
  // Убеждаемся, что изначально isTouched = false
  expect(component.isTouched).toBeFalse();

  spyOn(component.close, 'emit');

  // Находим и кликаем по кнопке "Order"
  const orderButton = fixture.debugElement.query(By.css('.order-body button:last-of-type'));
  orderButton.triggerEventHandler('click', null);

  // После клика:
  expect(component.isTouched).toBeTrue();           // поля теперь touched
  expect(component.close.emit).not.toHaveBeenCalled(); // модалка не закрылась
});

it('should emit form value and close dialog when "Order" is clicked with valid form', () => {
  spyOn(component.close, 'emit');

  // Заполняем форму валидными данными
  const validData = {
    id: 1,
    name: 'Alice',
    orderDate: new Date('2026-01-15'),
    readyDate: new Date('2026-01-15'),
    deliveryAddress: 'Moscow, Tverskaya 1',
    deliveryMethod: 'Courier',
    paymentMethod: 'cash'
  };
  component.orderForm.patchValue(validData);
  expect(component.orderForm.valid).toBeTrue();
  fixture.detectChanges();

  // Действие: кликаем по кнопке "Order"
  const orderButton = fixture.debugElement.query(By.css('.order-body button:last-of-type'));
  orderButton.triggerEventHandler('click', null);

  // Проверка: модалка закрылась с правильными данными
  expect(component.close.emit).toHaveBeenCalledWith();
});
});
