import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../Services/auth.service';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    imports: [FormsModule]
})
export class HomeComponent {
    constructor(private router: Router, private authService : AuthService ) {}

    ngOnInit() {
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

    navigateToRoomPage(){
        this.router.navigate(['/rooms']);
    }

    navigateToBookingPage(){
        this.router.navigate(['/booking']);
    }

    onSubmit() {
        this.router.navigate(['/booking']);
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

    navigateToAbout() {
        this.router.navigate(['/about']);
    }

    
}

