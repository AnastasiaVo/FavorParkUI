// src/app/components/room/room.component.ts
import { Component, OnInit } from '@angular/core';
import { RoomService } from '../../Services/room.service';
import { Room } from '../../Models/RoomModels/Room';
import { Router } from '@angular/router';
import { MaterialModule } from '../../material/material.module';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-room',
  standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
    ],
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {
  rooms: Room[] = [];

  constructor(
    private roomService: RoomService, 
    private router: Router,
    private authService : AuthService
  ) 
    { }

  ngOnInit(){
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


  loadRooms(): void {
    this.roomService.getAllRooms().subscribe(rooms => {
      this.rooms = rooms;
    });
  }

  viewStandardRoomDetails(): void {
    this.router.navigate([`/standard-room`]);
  }

  viewBusinessRoomDetails(): void {
    this.router.navigate([`/business-room`]);
  }

  viewSuiteRoomDetails(): void {
    this.router.navigate([`/suite-room`]);
  }

  navigateToRoom() {
    this.router.navigate(['/room']);
}
navigateToAbout() {
    this.router.navigate(['/about']);
}

navigateToBookingPage(){
  this.router.navigate(['/booking']);
}
}

