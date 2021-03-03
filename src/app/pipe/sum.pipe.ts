import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sum'
})
export class SumPipe implements PipeTransform {
  transform(items: any[], attr: string, phrase: string, key: string = ''): any {


    if (!Array.isArray(items) || !phrase) {
      return items.reduce((a, b) => a + b[attr], 0);
    }
    if (Number(phrase)) {
      return items.filter(item => Number(item[key]) == Number(phrase)).reduce((a, b) => a + b[attr], 0);
    } else {
      phrase = phrase.toLowerCase();
      return items.filter(item => String(item[key]).toLowerCase().includes(phrase)).reduce((a, b) => a + b[attr], 0);
    }


      //return items.reduce((a, b) => a + b[attr], 0);
  }
}