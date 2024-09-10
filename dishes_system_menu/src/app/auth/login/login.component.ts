import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { AppState } from '../../store/app.state';
import { Login } from '../../store/auth/auth.action';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  userForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(16),
    ]),
  });

  constructor(private store: Store<AppState>) {}

  login() {
    if (this.userForm.valid) {
      this.store.dispatch(
        Login({
          username: this.userForm.value.username!,
          password: this.userForm.value.password!,
        })
      );
    }
  }
}
