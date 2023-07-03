import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root' 
  })
  export class DataService {
    constructor(private http: HttpClient) { }

    getUsers(): Observable<any> {
        const url = 'https://randomuser.me/api/?results=50'; 
        return this.http.get<any>(url);
      }

    getProduct(): Observable<any> {
        const url = 'https://fakestoreapi.com/products'; 
        return this.http.get<any>(url);
      }
      
  }
  