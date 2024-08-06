import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { HOSTING_API_URL } from '../app-injection-tokens';
import { UserEmailLogin } from '../Models/CredentialsModels/UserEmailLogin';
import { Observable } from 'rxjs';
import { UpdateUser } from '../Models/UserModels/UpdateUser';
import { User } from '../Models/UserModels/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private hostingUrl: string;
  constructor(
    private http: HttpClient,
    @Inject(HOSTING_API_URL) private apiUrl: string
  ) {
    this.hostingUrl = `${apiUrl}/api/User/`;
  }

  isUserExists(email: string): Observable<boolean> {
    const model = new UserEmailLogin(email);
    return this.http.post<boolean>(`${this.hostingUrl}exist`, model);
  }

  updateUser(userUpdateModel: UpdateUser): Observable<void> {
    return this.http.put<void>(`${this.hostingUrl}updateUser`, userUpdateModel);
  }

  getUser(id: string): Observable<User> {
    return this.http.get<User>(`${this.hostingUrl}profileUser/${id}`);
  }

  getMyProfile(): Observable<User> {
    return this.http.get<User>(`${this.hostingUrl}profileUser/my`);
  }

  searchUserByName(userName: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.hostingUrl}findByName/${userName}`);
  }
}
