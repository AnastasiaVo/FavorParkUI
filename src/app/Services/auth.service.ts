// auth.service.ts
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { HOSTING_API_URL } from '../app-injection-tokens';
import { RegisterUser } from '../Models/AuthorizationModels/RegisterUser';
import { Token } from '../Models/AuthorizationModels/Token';
import { isPlatformBrowser } from '@angular/common';

export const ACCESS_TOKEN_KEY = 'hotel_api_token';
export const USERID = 'userId';
export const IS_ADMIN = 'is_admin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private http: HttpClient,
    @Inject(HOSTING_API_URL) private apiUrl: string,
    private jwtHelper: JwtHelperService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }


  private isLocalStorageAvailable(): boolean {
    return isPlatformBrowser(this.platformId) && typeof localStorage !== 'undefined';
  }

  register(user: RegisterUser) {
    return this.http.post<RegisterUser>(`${this.apiUrl}/account/register`, {
      ...user
    });
  }

  login(email: string, password: string): Observable<Token> {
    return this.http.post<Token>(`${this.apiUrl}/account/login`, {
      email, password
    }).pipe(
      tap(token => {
        if (this.isLocalStorageAvailable()) {
          localStorage.setItem(ACCESS_TOKEN_KEY, token.token);
          localStorage.setItem(USERID, this.decodeToken().unique_name);

          var role = this.decodeToken().role;
          if (role !== null && role.includes("Admin")) {
            localStorage.setItem(IS_ADMIN, "true");
          } else {
            localStorage.setItem(IS_ADMIN, "false");
          }
        }
      })
    )
  }

  isAuthenticated(): boolean {
    if (this.isLocalStorageAvailable()) {
      var token = localStorage.getItem(ACCESS_TOKEN_KEY);
      if (token === null) {
        token = "";
      }
      return !this.jwtHelper.isTokenExpired(token);
    }
    return false;
  }

  decodeToken() {
    var token = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (token === null)
      token = "";
    return this.jwtHelper.decodeToken(token);
  }

  getToken(): string | null {
    if (this.isLocalStorageAvailable()) {
        return localStorage.getItem(ACCESS_TOKEN_KEY);
    }
    return null;
}

getUserId(): string | null {
    if (this.isLocalStorageAvailable()) {
        return localStorage.getItem(USERID);
    }
    return null;
}

logout(): void {
    if (this.isLocalStorageAvailable()) {
        localStorage.removeItem(ACCESS_TOKEN_KEY);
        localStorage.removeItem(USERID);
        localStorage.removeItem(IS_ADMIN);
    }
    this.router.navigate(['login']);
}

isAdmin(): boolean {
    if (this.isLocalStorageAvailable() && localStorage.getItem(IS_ADMIN) === "true") {
        return true;
    }
    return false;
}

}
