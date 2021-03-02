import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})

export class SortPipe implements PipeTransform {  
  transform(value: any[], key: string, direction: string): any[] {
    if (!Array.isArray(value) || !key || !value || direction== 'none') {
      return value;
    }
    return value.sort((a, b) => {
      if (typeof a[key] === 'number' && typeof b[key] === 'number') {
         return (direction == 'up') ? (a[key] - b[key]): (b[key] - a[key]);
      }
      const aString: string = ('' + a[key]).toLowerCase();
      const bString: string = ('' + b[key]).toLowerCase();
      return (direction == 'up') ? aString.localeCompare(bString):bString.localeCompare(aString);
    });
  }
}

/*
export class SortPipe implements PipeTransform {
  transform(value: any[], key: string, direction: number): any[] {
    if (!Array.isArray(value) || !key || !value) {
      return value;
    }
    return value.sort((a, b) => {
      if (typeof a[key] === 'number' && typeof b[key] === 'number') {
        return direction * (a[key] - b[key]);
      }
      const aString: string = ('' + a[key]).toLowerCase();
      const bString: string = ('' + b[key]).toLowerCase();
      return direction * aString.localeCompare(bString);
    });
  }
}
*/