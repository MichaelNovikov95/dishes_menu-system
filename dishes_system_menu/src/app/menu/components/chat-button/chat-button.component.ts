import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ChatWindowComponent } from '../../dialogs/chat-window/chat-window.component';
import { SocketService } from '../../../shared/services/socket/socket.service';

@Component({
  selector: 'app-chat-button',
  templateUrl: './chat-button.component.html',
  styleUrl: './chat-button.component.css',
})
export class ChatButtonComponent {
  constructor(private dialog: MatDialog, private socket: SocketService) {}

  public openChat(): void {
    this.socket.connect();
    const dialogRef = this.dialog.open(ChatWindowComponent, {
      width: '400px',
    });
  }
}
