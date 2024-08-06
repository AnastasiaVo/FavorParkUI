// src/app/services/booking.service.ts
import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Booking } from '../Models/BookingModels/Booking';
import { HOSTING_API_URL } from '../app-injection-tokens';
import { RoomService } from './room.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private apiUrl: string;

  constructor(
    private http: HttpClient, 
    @Inject(HOSTING_API_URL) apiUrl: string,
    private roomService: RoomService,
    private authService: AuthService
  ) {
    this.apiUrl = `${apiUrl}/booking`;
  }

  getAllBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.apiUrl}/all`);
  }

  getBookingById(id: number): Observable<Booking> {
    return this.http.get<Booking>(`${this.apiUrl}/${id}`);
  }

  createBooking(booking: Booking): Observable<Booking> {
    return this.http.post<Booking>(`${this.apiUrl}/create`, booking);
  }

  updateBooking(id: number, booking: Booking): Observable<Booking> {
    return this.http.put<Booking>(`${this.apiUrl}/update?id=${id}`, booking);
  }

  deleteBooking(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }

  calculateRoomFee(startDate: Date, endDate: Date, numberOfAdults: number, numberOfChildren: number, roomType: string): number {
    // This is a placeholder for the room fee calculation logic
    const numberOfDays = (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24);
    let baseRate = 0; // This should be replaced with the base rate for the room
    switch (roomType) {
        case "Standard":
            baseRate = 1800;
            break;
        case "Business":
            baseRate = 2550;
            break;
        case "Suite":
            baseRate = 3500;
            break;
        default:
            throw new Error("Invalid room type");
    }
    const extraGuestCharge = 100; // This should be replaced with the extra guest charge
    const extraChildCharge = 50; // This should be replaced with the extra child charge

    let roomFee = baseRate * numberOfDays;
    if (numberOfAdults > 2) {
      roomFee += (numberOfAdults - 2) * extraGuestCharge * numberOfDays;
    }
    if (numberOfChildren > 0) {
      roomFee += numberOfChildren * extraChildCharge * numberOfDays;
    }

    return roomFee;
    }
}


