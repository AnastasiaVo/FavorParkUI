// booking.component.ts
import { Component, OnInit } from '@angular/core';
import { RoomIdService } from '../../Services/room-id.service';
import { BookingService } from '../../Services/booking.service';
import { Room } from '../../Models/RoomModels/Room';
import { Booking } from '../../Models/BookingModels/Booking';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RoomService } from '../../Services/room.service'; 

@Component({
  selector: 'app-booking',
  standalone: true,
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
  imports: [FormsModule, CommonModule]
})
export class BookingComponent implements OnInit {
  roomId: number = 0;
  roomType: string = '';
  startDate: Date = new Date();
  endDate: Date = new Date();
  numberOfGuests: number = 0;
  numberOfChildren: number = 0;
  rooms: Room[] = [];
  bookings: Booking[] = [];

  showMore = false;
  showRooms = false;

  constructor(
    private roomIdService: RoomIdService,
    private bookingService: BookingService,
    private router: Router,
    private authService : AuthService,
    private roomService: RoomService
  ) { }

  ngOnInit(): void {
    this.roomIdService.currentRoomId.subscribe(roomId => this.roomId = roomId);
    this.roomService.getAllRooms().subscribe(rooms => this.rooms = rooms);
    console.log('Room ID:', this.roomId);
  }

  searchRooms(): void {
    this.showRooms = true;
  }

  calculateRoomFee(room: Room): number {
    return this.bookingService.calculateRoomFee(this.startDate, this.endDate, this.numberOfGuests, this.numberOfChildren, this.roomType);
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
        this.router.navigate(['/final-booking']);
    }

    onAdultsChange(event: any) {
        let adults = event.target.value;
        let childrenInput = document.getElementById('children') as HTMLInputElement;
    
        if (childrenInput) {
            if (adults == 2) {
                childrenInput.max = "2";
            } else if (adults == 3) {
                childrenInput.max = "0";
            } else {
                childrenInput.max = "";
            }
        }
    }
    
    onChildrenChange(event: any) {
        let children = event.target.value;
        let adultsInput = document.getElementById('adults') as HTMLInputElement;
    
        if (adultsInput) {
            if (children == 2) {
                adultsInput.max = "2";
            } else {
                adultsInput.max = "";
            }
        }
    }
}