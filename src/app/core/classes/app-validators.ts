import { FormControl } from '@angular/forms';
import { parse, isValidNumber } from 'libphonenumber-js';

export class AppValidators {
  static contact(control: FormControl) {
    try {
      if (
        typeof control.value !== 'undefined' &&
        control.value != null &&
        control.value !== ''
      ) {
        const isContactValid = isValidNumber(parse(`${control.value}`, 'IN'));
        if (!isContactValid || isNaN(control.value)) {
          return { contact: true };
        } else {
          return null;
        }
      }
      return null;
    } catch (error) {
      return { contact: true };
    }
  }
}
