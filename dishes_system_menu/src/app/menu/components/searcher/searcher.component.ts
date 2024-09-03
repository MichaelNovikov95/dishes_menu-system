import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-searcher',
  templateUrl: './searcher.component.html',
  styleUrl: './searcher.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SearcherComponent),
      multi: true,
    },
  ],
})
export class SearcherComponent implements ControlValueAccessor {
  public searcher: string = '';
  public errorMsg: string | null = null;

  private onChange!: (value: string) => void;
  private onTouched!: () => void;

  writeValue(value: string): void {
    this.searcher = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searcher = input.value;

    this.onChange(this.searcher);
  }
}
