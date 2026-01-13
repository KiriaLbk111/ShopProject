import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PotionsService } from '../services/potions.service';
import { PotionModel } from '../models/potion.model';

@Component({
  selector: 'app-order-potion',
  templateUrl: './order-potion.component.html',
  styleUrls: ['./order-potion.component.scss']
})
export class OrderPotionComponent implements OnInit {
  @Output() close = new EventEmitter<void>();
  orderForm: FormGroup;
  potionOptions: PotionModel[] = [];
  paymentOptions: {id: string; name: string;}[] = [];
  isTouched: boolean = false;

  constructor(
    private fb: FormBuilder,
    private potionsService: PotionsService
  ) {
    this.orderForm = this.fb.group({
      id: [null, Validators.required],
      name: ['', Validators.required],
      orderDate: ['', Validators.required],
      readyDate: [null, Validators.required],
      deliveryAddress: ['', Validators.required],
      deliveryMethod: ['', Validators.required],
      paymentMethod: ['cash', Validators.required]
    });
  }

  ngOnInit(): void {
    this.potionOptions = this.potionsService.getPotions();
    this.paymentOptions = this.potionsService.getPaymentOptions();
  }

  onClose(): void {
    this.close.emit();
  }

  submit(): void {
    this.isTouched = true;
    if (this.orderForm?.valid) {
      let orderFormValue = this.orderForm.value;
      let order = {
        ...orderFormValue,
        orderDate: orderFormValue.orderDate.toDateString(),
        readyDate: orderFormValue.readyDate.toDateString()
      }
      this.potionsService.addOrder(order);
      this.close.emit();
    }
  }
}