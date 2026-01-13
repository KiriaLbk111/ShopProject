import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, NgControl } from '@angular/forms';
import { PotionModel } from 'src/app/features/potions/models/potion.model';

type selectType ={ id: string; name: string }
  | PotionModel;

@Component({
  selector: 'app-custom-select',
  templateUrl: './custom-select.component.html',
  styleUrls: ['././custom-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomSelectComponent),
      multi: true
    }
  ]
})
export class CustomSelectComponent implements ControlValueAccessor {
  @Input() options: selectType[] = [];
  @Input() label = '';
  @Input() placeholder = '';
  @Input() isTouched: boolean = false;

  value: any = null;

  onChange = (_: any) => {};
  onTouched = () => {};

  constructor() {}

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  selectionChange(value: any) {
    this.value = value;
    this.onChange(value);
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  isInvalid(): boolean {
    return this.isTouched && !this.value;
  }
}