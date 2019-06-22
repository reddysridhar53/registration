import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class SearchService {
    constructor(private http: HttpClient) { }

    getDetails(query: any): Observable<any> {
        if (query) {
            query = `?wwid=${query.wwid}`
        }
        return this.http.get(`${config.apiUrl}/getEmployee${query}`);
    }

    updateDetails(details: any): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        return this.http.post(`${config.apiUrl}/updateActivity`, details, { headers });
    }
}