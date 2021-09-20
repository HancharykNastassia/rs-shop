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

  checkLocalStroage(): string | null {
    return localStorage.getItem("rs-shop-user");
  }

  registerUser(name: string, lastName: string, login: string, password: string): Observable<string> {
    return this.http.post<{token: string}>(`${this.host}users/register`, {
      "firstName": name,
      "lastName": lastName,
      "login": login,
      "password": password
    }).pipe(
      map(resp => {
        localStorage.setItem("rs-shop-user", resp.token);
        return resp.token;
      })
    );
  }

  loginUser(login: string, password: string): Observable<string> {
    return this.http.post<{token: string}>(`${this.host}users/login`, {
      "login": login,
      "password": password
    }).pipe(
      map(resp => {
        localStorage.setItem("rs-shop-user", resp.token);
        return resp.token;
    })
    );
  }

  logoutUser(): void {
    localStorage.removeItem("rs-shop-user");
  }

  getUserInfo(token: string): Observable<User | undefined> {
    if (!token || token.length === 0){
      return of(undefined);
    }
    return this.http.get<User>(`${this.host}users/userInfo`, {
      headers: new HttpHeaders(`Authorization: Bearer ${token}`)
    });
  }
}
