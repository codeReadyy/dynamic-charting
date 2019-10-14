import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(value: any, item?: string, order?:number): any {
    if (!value || !item || !order) return value;
    return value.sort((a ,b) => {
      a = a[item];
      b = b[item];
      return a > b ? order : order * (- 1);
    })
  }

}
