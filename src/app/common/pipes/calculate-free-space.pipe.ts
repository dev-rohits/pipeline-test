import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'calculateFreeSpace',
})
export class CalculateFreeSpacePipe implements PipeTransform {
  transform(value: any[]): number {
    let size: number = 0;
    value.forEach((value: any) => {
      size = size + value.size;
    });
    return size;
  }
}
