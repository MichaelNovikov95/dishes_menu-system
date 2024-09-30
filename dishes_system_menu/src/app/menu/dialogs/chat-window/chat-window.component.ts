import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';

import { SocketService } from '../../../shared/services/socket/socket.service';
import { AppState } from '../../../store/app.state';
import { Message } from '../../../shared/interfaces/message.interface';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrl: './chat-window.component.css',
})
export class ChatWindowComponent implements OnInit {
  public userRole: string[] | null = [];
  public users: string[] = [];
  public user: string = '';
  public messages: Message[] = [];
  public newMessage = new FormControl('', [Validators.minLength(5)]);
  public adminCanSendMessage: boolean = false;
  public unreadMessages: { [user: string]: number } = {};

  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private socket: SocketService, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store
      .select('auth')
      .pipe(takeUntil(this.destroy$))
      .subscribe((authState) => {
        this.userRole = authState.roles;
      });

    this.socket.emit('get_messages', {
      socketId: this.user,
      userId: localStorage.getItem('userId'),
      isAdmin: this.userRole?.includes('admin'),
    });

    this.socket.on('new_message').subscribe((messages) => {
      this.messages = messages;
    });

    this.socket.emit('user_connect', localStorage.getItem('userId'));

    this.socket.on('admin_users').subscribe((users) => {
      this.users = users;
    });

    this.socket.on('admin_messages').subscribe((messages) => {
      this.messages = messages;
    });

    this.socket.on('user_messages').subscribe((messages) => {
      this.messages = messages;
    });

    this.socket.on('unreaded_messages').subscribe((unreaded_messages) => {
      unreaded_messages.forEach(
        (user: { socketId: string; unreaded_messages_count: string }) => {
          const socketId = user.socketId;
          const currentCount = Number(user.unreaded_messages_count);
          this.unreadMessages[socketId] = currentCount;
        }
      );
    });
  }

  public sendMessage(): void {
    const isAdmin = this.userRole?.includes('admin');
    const senderId = localStorage.getItem('userId');
    if (this.newMessage.valid) {
      this.socket.emit('new_message', {
        messageContent: this.newMessage.value,
        senderId: senderId,
        isAdmin: isAdmin,
        targetUser: this.user,
      });
      this.newMessage.setValue('');
    }
  }

  public connectToRoom(user: string): void {
    if (this.user) {
      this.socket.emit('leave_room', this.user);
    }
    this.socket.emit('join_room', user);
    this.socket.emit('get_messages', {
      socketId: user,
      userId: '',
      isAdmin: true,
    });
    this.socket.emit('reset_unreaded_messages', user);
    this.adminCanSendMessage = true;
    this.user = user;
    this.unreadMessages[user] = 0;
  }

  public goBack(): void {
    this.socket.emit('leave_room', this.user);
    this.adminCanSendMessage = false;
    this.user = '';
    this.messages = [];
  }
}
