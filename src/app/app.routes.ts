import { Routes } from '@angular/router';
import { LoginComponent } from './Components/Auth/Login/login.component';
import { RegistrationComponent } from './Components/Auth/Registration/register.component';
import { RoomComponent } from './Components/Room/room.component';
import { HomeComponent } from './Components/Home/home.component';
import { AuthGuard } from './auth.guard';
import { StandardRoomComponent } from './Components/Room/Standart Room/standard-room.component';
import { BookingByRoomComponent } from './Components/Booking/BookingByRoom/booking-by-room.component';
import { BookingComponent } from './Components/Booking/booking.component';
import { FinalBooking } from './Components/Booking/FinallBookingPage/final-booking.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'rooms', component: RoomComponent },
  { path: 'home', component: HomeComponent},
  { path: 'standard-room', component: StandardRoomComponent},
  { path: 'booking-by-roomST', component: BookingByRoomComponent},
  { path: 'booking', component: BookingComponent},
  { path: 'final-booking', component: FinalBooking},
  { path: '', component: HomeComponent, pathMatch: 'full' }
];



