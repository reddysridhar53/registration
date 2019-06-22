import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })

export class SearchService {
    constructor(private http: HttpClient) { }

    getDetails(query: Object = {}) {
        return this.http.get(`${config.apiUrl}/search?${query}`);
    }

    updateDetails(details: any) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        return this.http.post(`${config.apiUrl}/save`, details, { headers });
    }
}