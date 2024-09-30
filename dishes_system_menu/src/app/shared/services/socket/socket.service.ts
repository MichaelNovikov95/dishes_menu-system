import { Injectable } from '@angular/core';
import { Socket, io } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: Socket | null = null;

  public connect(): void {
    this.socket = io(import.meta.env.NG_APP_API_URL);
  }

  public disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  public emit(event: string, data: any) {
    this.socket?.emit(event, data);
  }

  public on(event: string): Observable<any> {
    return new Observable((observer) => {
      this.socket?.on(event, (data) => {
        observer.next(data);
      });

      return () => {
        this.socket?.off(event);
      };
    });
  }
}
