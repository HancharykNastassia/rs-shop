import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  host = "http://localhost:3004/";

  constructor(private http: HttpClient) {}

  registerUser(name: string, lastName: string, login: string, password: string): void {
    this.http.post<{token: string}>(`${this.host}users/register`, {
      "firstName": name,
      "lastName": lastName,
      "login": login,
      "password": password
    }).pipe(
      map(resp => localStorage.setItem("rs-shop-user", resp.token))
    );
  }

  loginUser(login: string, password: string): void {
    this.http.post<{token: string}>(`${this.host}users/login`, {
      "login": login,
      "password": password
    }).pipe(
      map(resp => localStorage.setItem("rs-shop-user", resp.token))
    );
  }

  logoutUser(): void {
    localStorage.removeItem("rs-shop-user");
  }

  getUserInfo(): Observable<User> {
    return this.http.get<User>(`${this.host}users/userInfo`, {
      headers: new HttpHeaders(`Authorization: Bearer ${localStorage.getItem("rs-shop-user")}`)
    });
  }
}
