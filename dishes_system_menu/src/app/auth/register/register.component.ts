import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';

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

  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    if (this.userForm.valid) {
      this.authService
        .register(this.userForm.value.username!, this.userForm.value.password!)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => this.router.navigate(['/auth/login']));
    } else {
      this.errorMessage = "Passwords didn't match. Check it.";
    }
  }

  private passCheker(): ValidatorFn {
    return (form: AbstractControl): ValidationErrors | null => {
      const password = form.get('password')?.value;
      const rep_password = form.get('rep_password')?.value;

      return password === rep_password ? null : { mismatch: true };
    };
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
