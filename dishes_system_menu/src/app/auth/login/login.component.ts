import { Component, OnDestroy } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnDestroy {
  userForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(16),
    ]),
  });

  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    if (this.userForm.valid) {
      this.authService
        .login(this.userForm.value.username!, this.userForm.value.password!)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => this.router.navigate(['/']));
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
