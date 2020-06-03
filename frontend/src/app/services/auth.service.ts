import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user';
import { JwtResponse } from '../interfaces/jwt-response';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  backend: string = 'http://localhost:8888/api';
  //authSubject = new BehaviorSubject(false);
  private token: string;

  constructor(private httpClient: HttpClient, public jwtHelper: JwtHelperService ) { }

  register(user: User): Observable<JwtResponse> {
    return this.httpClient.post<JwtResponse>(`${this.backend}/usuarios/register`,
      user).pipe(tap(
        (res: JwtResponse) => {
          console.log(res);
          if (res) {
            this.saveToken(res.auth, res.token);
          }
        })
      );
  }

  login(user: User): Observable<JwtResponse> {
    return this.httpClient.post<JwtResponse>(`${this.backend}/usuarios/login`,
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

  public getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem("token");
    }
    return this.token;
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

}
