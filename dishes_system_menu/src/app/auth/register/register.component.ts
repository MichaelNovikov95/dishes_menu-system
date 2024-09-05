import { Component } from '@angular/core';
import { AuthService } from '../../shared/services/auth/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  userForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    this.authService
      .register(this.userForm.value.username!, this.userForm.value.password!)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.router.navigate(['/']));
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
