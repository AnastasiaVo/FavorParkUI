import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RegisterUser } from '../../../Models/AuthorizationModels/RegisterUser';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../../Services/auth.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MaterialModule } from '../../../material/material.module';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationComponent {
  constructor(
    private as: AuthService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}
  email = new FormControl('', [Validators.required, Validators.email]);
  ngOnInit() {
  }
  public get isLoggedIn() : boolean{
    return this.as.isAuthenticated();
  }
  login(username:string, password:string){
    this.as.login(username, password)
      .subscribe({
        complete: () => {
          this.router.navigate(['']);
        }
        , error: () => {
          alert('Wrong login or email')
        }
      })
  }
  register( 
    { email, password, confirmPassword, phoneNumber, firstName, lastName}: 
    { 
      email: string,
      password: string,
      confirmPassword: string,
      phoneNumber: string,
      firstName : string,
      lastName : string
  }): void {
    this.as.register(new RegisterUser(email, password, confirmPassword, phoneNumber, firstName, lastName))
      .subscribe({
        complete: () => {
          this.login(email, password)
        }
        , error: () => {
          alert('Error occured!')
        }
      })
  }
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
}

