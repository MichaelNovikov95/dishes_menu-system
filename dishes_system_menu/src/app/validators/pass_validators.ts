import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

export function passCheker(): ValidatorFn {
  return (form: AbstractControl): ValidationErrors | null => {
    const password = form.get('password')?.value;
    const rep_password = form.get('rep_password')?.value;

    return password === rep_password
      ? null
      : { mismatch: "Passwords didn't match. Please, check your inputs" };
  };
}
