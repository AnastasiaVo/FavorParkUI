import { Component, OnInit } from '@angular/core';
import { RoomIdService } from '../../../Services/room-id.service';
import { BookingService } from '../../../Services/booking.service';
import { Room } from '../../../Models/RoomModels/Room';
import { Booking } from '../../../Models/BookingModels/Booking';
import { Router } from '@angular/router';
import { AuthService } from '../../../Services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RoomService } from '../../../Services/room.service'; 
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../confirmation-dialog.component';

@Component({
  selector: 'app-final-booking',
  standalone: true,
  templateUrl: './final-booking.component.html',
  styleUrls: ['./final-booking.component.css'],
  imports: [FormsModule, CommonModule]
})
export class FinalBooking implements OnInit {
  roomId: number = 0;
  roomType: string = '';
  startDate: Date = new Date();
  endDate: Date = new Date();
  numberOfGuests: number = 0;
  numberOfChildren: number = 0;
  rooms: Room[] = [];
  bookings: Booking[] = [];
  bookingForSelf: boolean = false;
  bookingForOther: boolean = false;

  showMore = false;
  showRooms = false;

  showPersonalInformation = true;
  showPaymentType = true;

  constructor(
    private roomIdService: RoomIdService,
    private bookingService: BookingService,
    private router: Router,
    private authService : AuthService,
    private roomService: RoomService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.roomIdService.currentRoomId.subscribe(roomId => this.roomId = roomId);
    this.roomService.getAllRooms().subscribe(rooms => this.rooms = rooms);
    console.log('Room ID:', this.roomId);
  }

  bookForSelf(): void {
    this.bookingForSelf = true;
    this.bookingForOther = false;
  }

  bookForOther(): void {
    this.bookingForSelf = false;
    this.bookingForOther = true;
  }

  searchRooms(): void {
    this.showRooms = true;
  }

  bookRoom(): void {
    if (this.isLoggedIn) {
        this.router.navigate(['/final-booking']);
    } else {
        this.router.navigate(['/login']);
    }
  }

  navigateToRoomPage(){
    this.router.navigate(['/rooms']);
  }

  navigateToBookingPage(){
    this.router.navigate(['/booking']);
  }

  navigateToProfileOrLogin() {
    if (this.isLoggedIn) {
        this.router.navigate(['/profile']);
    } else {
        this.router.navigate(['/login']);
    }
  }

  public get isLoggedIn() : boolean{
    return this.authService.isAuthenticated();
  }
  viewBusinessRoomDetails(): void {
    this.router.navigate([`/business-room`]);
  }

  onSubmit() {
    this.router.navigate(['/booking']);
  }

  togglePersonalInformation(): void {
    this.showPersonalInformation = !this.showPersonalInformation;
  }

  togglePaymentType(): void {
    this.showPaymentType = !this.showPaymentType;
  }

  validateForm(): boolean {
    if (!this.bookingForSelf && !this.bookingForOther) {
      alert('Please select who you are booking for.');
      return false;
    }

    return true;
  }

  confirmBooking(): void {
    if (this.validateForm()) {
      this.dialog.open(ConfirmationDialogComponent);
    }
  }
}

