import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './store/app.state';
import { LoginSuccess } from './store/auth/auth.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'dishes_system_menu';

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    const token = localStorage.getItem('token');
    const roles = JSON.parse(localStorage.getItem('roles') || '[]');

    if (token) {
      this.store.dispatch(LoginSuccess({ roles }));
    }
  }
}
