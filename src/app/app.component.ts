import { Component } from '@angular/core';
import { RouterModule, RouterOutlet} from '@angular/router';
import { AuthService } from './Services/auth.service';

import { MaterialModule } from './material/material.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [RouterOutlet, MaterialModule, RouterModule]
})
export class AppComponent {
  title = 'FavorParkHotel';

  constructor(
    private as: AuthService
  ) {}

  public get isLoggedIn() : boolean{
    return this.as.isAuthenticated();
  }
}
