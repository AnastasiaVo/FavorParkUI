// room-id.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomIdService {
  private roomIdSource = new BehaviorSubject<number>(0);
  currentRoomId = this.roomIdSource.asObservable();

  constructor() { }

  changeRoomId(roomId: number) {
    this.roomIdSource.next(roomId);
  }
}
