import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';

import { SocketService } from '../../../shared/services/socket/socket.service';
import { AppState } from '../../../store/app.state';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent implements OnInit, OnDestroy {
  public userRole: string[] | null = [];
  public unreadMessages: { [user: string]: number } = {};

  constructor(
    private socket: SocketService,
    private store: Store<AppState>,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.store.select('auth').subscribe((authState) => {
      if (authState.roles?.includes('admin')) {
        this.socket.connect();
        this.socket.emit('user_connect', {
          userId: localStorage.getItem('userId'),
        });
        this.userRole = authState.roles;
      }
    });

    this.socket.on('unreaded_messages').subscribe((unreaded_messages) => {
      unreaded_messages.forEach(
        (user: { socketId: string; unreaded_messages_count: string }) => {
          const socketId = user.socketId;
          const currentCount = Number(user.unreaded_messages_count);

          if (currentCount > (this.unreadMessages[socketId] || 0)) {
            if (this.userRole?.includes('admin')) {
              this.showNotification();
            }
          }

          this.unreadMessages[socketId] = currentCount;
        }
      );
    });
  }

  private showNotification() {
    this.snackBar.open('You have a new message', 'Close', {
      duration: 5000,
      horizontalPosition: 'left',
      verticalPosition: 'bottom',
    });
  }

  ngOnDestroy(): void {
    this.socket.disconnect();
  }
}
