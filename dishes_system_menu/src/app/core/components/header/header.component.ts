import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DishWindowComponent } from '../../../menu/dialogs/dish-window/dish-window.component';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.state';
import { selectAuthUser } from '../../../store/auth/auth.selector';
import { Observable } from 'rxjs';
import { User } from '../../../shared/interfaces/user.interface';
import { Logout } from '../../../store/auth/auth.action';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  private user$!: Observable<User | null>;
  public userRoles: string[] | undefined = [];

  constructor(public dialog: MatDialog, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.user$ = this.store.select(selectAuthUser);
    this.user$.subscribe((user) => (this.userRoles = user?.roles));
  }

  public openDishDialog(id: string | null) {
    this.dialog.open(DishWindowComponent, {
      width: '1000px',
      data: { id: null },
    });
  }

  public Logout() {
    this.store.dispatch(Logout());
  }
}
