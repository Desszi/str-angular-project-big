import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: any[], phrase: string, key: string = ''): any {

    if (key) {
      if (!Array.isArray(value) || !phrase) {
        return value;
      }else{
      //if (Number(phrase)) {
      //  return value.filter(item => Number(item[key]) == Number(phrase));
      //} else {
        phrase = phrase.toLowerCase();
        return value.filter(item => String(item[key]).toLowerCase().includes(phrase));
      }
    }
    else {
      if (!Array.isArray(value) || !phrase) {
        return value;
      }

      phrase = ('' + phrase).toLowerCase();
      return value.filter(
        item => JSON.stringify(item).toLowerCase().includes(phrase)
      );
    }
  }
}
