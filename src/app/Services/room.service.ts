// src/app/services/room.service.ts
import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Room} from '../Models/RoomModels/Room';
import { ApplyRoom } from '../Models/RoomModels/ApplyRoom';
import { HOSTING_API_URL } from '../app-injection-tokens';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private apiUrl: string;

  constructor(
    private http: HttpClient, 
    @Inject(HOSTING_API_URL) apiUrl: string) {
    this.apiUrl = `${apiUrl}/room`;
  }

  getAllRooms(): Observable<Room[]> {
    return this.http.get<Room[]>(`${this.apiUrl}/all`);
  }

  getRoomById(id: number): Observable<Room> {
    return this.http.get<Room>(`${this.apiUrl}/${id}`);
  }

  createRoom(room: ApplyRoom): Observable<Room> {
    return this.http.post<Room>(`${this.apiUrl}/create`, room);
  }

  updateRoom(id: number, room: ApplyRoom): Observable<Room> {
    return this.http.put<Room>(`${this.apiUrl}/update?id=${id}`, room);
  }

  deleteRoom(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}
