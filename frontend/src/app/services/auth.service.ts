import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user';
import { JwtResponse } from '../interfaces/jwt-response';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  AUTH_SERVER: string = 'http://localhost:8888/api';
  authSubject = new BehaviorSubject(false);
  private token: string;

  constructor(private httpClient: HttpClient, public jwtHelper: JwtHelperService ) { }

  register(user: User): Observable<JwtResponse> {
    return this.httpClient.post<JwtResponse>(`${this.AUTH_SERVER}/register`,
      user).pipe(tap(
        (res: JwtResponse) => {
          if (res) {
            // guardar token
            console.log(res);
            //this.saveToken(res.dataUser.accessToken, res.dataUser.expiresIn);
          }
        })
      );
  }

  login(user: User): Observable<JwtResponse> {
    return this.httpClient.post<JwtResponse>(`${this.AUTH_SERVER}/usuarios/login`,
      user).pipe(tap(
        (res: JwtResponse) => {
          if (res) {
            this.saveToken(res.auth, res.token);
          }
        })
      );
  }

  logout(): void {
    this.token = '';
    localStorage.removeItem("auth");
    localStorage.removeItem("token");
  }

  private saveToken(auth: boolean, token: string): void {
    localStorage.setItem("auth", JSON.stringify(auth));
    localStorage.setItem("token", token);
    this.token = token;
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem("TOKEN");
    }
    return this.token;
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

}
