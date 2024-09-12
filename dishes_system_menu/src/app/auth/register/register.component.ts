import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { AppState } from '../../store/app.state';
import { Register } from '../../store/auth/auth.action';

import { passCheker } from '../../validators/pass_validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  public showError: boolean = false;
  public userForm: FormGroup;

  constructor(private store: Store<AppState>, private fb: FormBuilder) {
    this.userForm = this.fb.group(
      {
        username: ['', Validators.required],
        password: ['', Validators.required],
        rep_password: ['', Validators.required],
      },
      { validators: passCheker() }
    );
  }

  public register(): void {
    this.errorMessageTimer();

    if (this.userForm.valid) {
      this.store.dispatch(Register({ ...this.userForm.value }));
    }
  }

  private errorMessageTimer(): void {
    this.showError = true;

    const errorTimeout = setTimeout(() => {
      this.showError = false;
      clearTimeout(errorTimeout);
    }, 5000);
  }
}
