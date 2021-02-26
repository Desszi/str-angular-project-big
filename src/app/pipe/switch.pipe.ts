import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'switch'
})
export class SwitchPipe implements PipeTransform {

  transform(value: any): string {
    if (value === 'true' || value === true) { return value = 'Igen' }
    else if (value === 'false' || value === false) { return value = 'Nem' }
    else if (value === 'new') { return value = 'Új' }
    else if (value === 'shipped') { return value = 'Kiszállítva' }
    else if (value === 'paid') { return value = 'Fizetve' }
    else if (value == 1) { return value = 'Ale' }
    else if (value == 2) { return value = 'APA' }
    else if (value == 3) { return value = 'Búza' }
    else if (value == 4) { return value = 'DIPA' }
    else if (value == 5) { return value = 'IPA' }
    else if (value == 6) { return value = 'Lager' }
    else if (value == 7) { return value = 'NEIPA' }
    else if (value == 8) { return value = 'Porter' }
    else return value
  }

}
