// src/app/services/accomodation-type.service.ts
import { Inject, Injectable } from '@angular/core';
import { HOSTING_API_URL } from '../app-injection-tokens';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccomodationType} from '../Models/AccomodationTypeModels/AccomodationType';
import { CreateAccomodationType} from '../Models/AccomodationTypeModels/CreateAccomodationType';

@Injectable({
    providedIn: 'root'
})
export class AccomodationTypeService {
    private hostingUrl: string;
    constructor(
        private http: HttpClient,
        @Inject(HOSTING_API_URL) private apiUrl: string
    ) {
        this.hostingUrl = `${apiUrl}/api/User/`;
    }

    getAllAccomodationTypes(): Observable<AccomodationType[]> {
        return this.http.get<AccomodationType[]>(this.apiUrl);
    }

    getAccomodationTypeById(id: number): Observable<AccomodationType> {
        return this.http.get<AccomodationType>(`${this.apiUrl}/${id}`);
    }

    createAccomodationType(data: CreateAccomodationType): Observable<AccomodationType> {
        return this.http.post<AccomodationType>(`${this.apiUrl}/accomodationtype`, data);
    }

    updateAccomodationType(id: number, data: AccomodationType): Observable<AccomodationType> {
        return this.http.put<AccomodationType>(`${this.apiUrl}/${id}`, data);
    }

    deleteAccomodationType(id: number): Observable<boolean> {
        return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
    }
}
