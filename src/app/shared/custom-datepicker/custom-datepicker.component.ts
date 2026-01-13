import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, NgControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-custom-datepicker',
  templateUrl: './custom-datepicker.component.html',
  styleUrls: ['././custom-datepicker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomDatepickerComponent),
      multi: true
    }
  ]
})
export class CustomDatepickerComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() placeholder = '';
  @Input() isTouched: boolean = false;

  value: Date | null = null;

  onChange = (_: any) => {};
  onTouched = () => {};

  writeValue(value: Date | null): void {
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

  onDateChange(event: MatDatepickerInputEvent<Date>) {
    this.onChange(event.value);
  }

  isInvalid(): boolean {
    return this.isTouched && !this.value;
  }
}