import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';

import { AppState } from '../../store/app.state';
import { Register } from '../../store/auth/auth.action';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  public errorMessage: string = '';
  public userForm = new FormGroup(
    {
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      rep_password: new FormControl('', Validators.required),
    },
    { validators: this.passCheker() }
  );

  constructor(private store: Store<AppState>) {}

  register() {
    if (this.userForm.valid) {
      this.store.dispatch(
        Register({
          username: this.userForm.value.username!,
          password: this.userForm.value.password!,
        })
      );
    }
  }

  private passCheker(): ValidatorFn {
    return (form: AbstractControl): ValidationErrors | null => {
      const password = form.get('password')?.value;
      const rep_password = form.get('rep_password')?.value;

      return password === rep_password ? null : { mismatch: true };
    };
  }
}
