import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { UserService } from '../../../Services/user.service';
import { AuthService } from '../../../Services/auth.service';
import { User } from '../../../Models/UserModels/User';
import { UpdateUser } from '../../../Models/UserModels/UpdateUser';
/* import { BookingService } from '../../Services/booking.service';
import { Booking } from '../../Models/BookingModels/Booking'; */
import { MaterialModule } from '../../../material/material.module';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user: User | undefined;
  bookings: Booking[] = [];
  profileForm: FormGroup;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private bookingService: BookingService,
    private fb: FormBuilder
  ) {
    this.profileForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      phoneNumber: ['']
    });
  }

  ngOnInit(): void {
    this.loadUserProfile();
    this.loadUserBookings();
  }

  loadUserProfile(): void {
    const userId = this.authService.getUserId();
    if (userId) {
      this.userService.getMyProfile().subscribe(user => {
        this.user = user;
        this.profileForm.patchValue({
          firstName: user.FirstName,
          lastName: user.LastName,
          phoneNumber: user.PhoneNumber
        });
      });
    }
  }

  loadUserBookings(): void {
    const userId = this.authService.getUserId();
    if (userId) {
      this.bookingService.getBookingsByUser(userId).subscribe(bookings => {
        this.bookings = bookings;
      });
    }
  }

  updateUserProfile(): void {
    if (this.profileForm.valid) {
      const updatedUser = new UpdateUser(
        this.profileForm.value.firstName,
        this.profileForm.value.lastName,
        this.profileForm.value.phoneNumber
      );
      this.userService.updateUser(updatedUser).subscribe(() => {
        this.loadUserProfile();
      });
    }
  }
}
