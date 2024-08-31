import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'custom',
})
export class WordNormalizer implements PipeTransform {
  transform(value: any) {
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  }
}
