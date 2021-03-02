import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  transform(
    value: any[] | null, phrase: string): any[] | null {
    if (!Array.isArray(value) || !phrase) {
      return value;
    }

    phrase = ('' + phrase).toLowerCase();
    return value.filter(
      item => JSON.stringify(item).toLowerCase().includes(phrase)
    );

  }
}
    /* value: any[] | null,
key: string,
phrase: string | number | boolean,
props?: { count: number }): any[] | null {
if (!Array.isArray(value) || !key || !phrase) {
  return value;
}

phrase = typeof phrase !== 'number' ? ('' + phrase).toLowerCase() : phrase;

const filtered = value.filter(item => {
  if (typeof item[key] === 'number' && typeof phrase === 'number') {
    return item[key] === phrase;
  }

  return ('' + item[key]).toLowerCase().includes((phrase as string));
});

if (props?.count) {
  props.count = filtered.length;
}

return filtered;
}
} */
