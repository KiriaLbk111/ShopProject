import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'app-custom-text-input',
  templateUrl: './custom-text-input.component.html',
  styleUrls: ['././custom-text-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomTextInputComponent),
      multi: true
    }
  ]
})
export class CustomTextInputComponent implements ControlValueAccessor {
  @Input() value: string = '';
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() isTouched: boolean = false;

  onChange = (_: any) => {};
  onTouched = () => {};

  writeValue(value: string): void {
    this.value = value || '';
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