// src/app/components/room/standard-room.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MaterialModule } from '../../../material/material.module';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../Services/auth.service';
import { RoomIdService } from '../../../Services/room-id.service';


@Component({
  selector: 'app-standard-room',
  standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
    ],
  templateUrl: './standard-room.component.html',
  styleUrls: ['./standard-room.component.css']
})
export class StandardRoomComponent implements OnInit {
    showMore = false; 

    constructor( 
    private router: Router,
    private authService : AuthService,
    private roomIdService: RoomIdService,
    ) 
    { }

    ngOnInit(){
    }

    setRoomId(roomId: number) {
        this.roomIdService.changeRoomId(roomId);
        this.navigateToBookingST();
    }

    navigateToProfileOrLogin() {
    if (this.isLoggedIn) {
        this.router.navigate(['/profile']);
    } else {
        this.router.navigate(['/login']);
    }
    }

    navigateToBookingPage(){
        this.router.navigate(['/booking']);
    }

    public get isLoggedIn() : boolean{
        return this.authService.isAuthenticated();
    }
    viewBusinessRoomDetails(): void {
        this.router.navigate([`/business-room`]);
    }

    viewSuiteRoomDetails(): void {
        this.router.navigate([`/suite-room`]);
    }

    navigateToRoomPage(){
        this.router.navigate(['/rooms']);
    }

    navigateToAbout() {
        this.router.navigate(['/about']);
    }

    navigateToBookingST(){
        this.router.navigate(['/booking-by-roomST']);
    }

    
    onSubmit() {
        this.router.navigate(['/booking']);
    }
}