import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mockFormatter'
})
export class MockFormatterPipe implements PipeTransform {

  transform(value: number, exponent: string , c: number): number {
    const exp = parseFloat(exponent);
    return Math.pow(value, isNaN(exp) ? 1 : exp) + c;
  }
}
