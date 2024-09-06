import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DishWindowComponent } from '../../../menu/dialogs/dish-window/dish-window.component';
import { AuthService } from '../../../auth/service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  public userRoles: string[] | undefined = undefined;

  constructor(public dialog: MatDialog, private authService: AuthService) {
    this.authService.currentUser.subscribe((v) => (this.userRoles = v?.roles));
  }

  public openDishDialog(id: string | null) {
    this.dialog.open(DishWindowComponent, {
      width: '1000px',
      data: { id: null },
    });
  }

  public Logout() {
    this.authService.logout();
  }
}
