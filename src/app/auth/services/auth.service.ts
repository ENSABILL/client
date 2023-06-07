import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { User } from '../models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenStorageService } from './token-storage.service';

const { API_BASE_URL } = environment;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  constructor(
    private http: HttpClient,
    private tokenStorageService: TokenStorageService
  ) {
    this.currentUserSubject = new BehaviorSubject<User | null>(
      tokenStorageService.getUser()
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    return this.http
      .post<User>(`${API_BASE_URL}/auth/login`, { username, password })
      .pipe(
        map((user) => {
          this.tokenStorageService.setUser(user);
          this.currentUserSubject.next(user);
          return user;
        })
      );
  }

  register(payload: { [key: string]: string }) {
    return this.http.post<any>(`${API_BASE_URL}/client/signup`, payload);
  }

  sendOtp() {
    return this.http.post(`${API_BASE_URL}/auth/get-otp`, null, {
      responseType: 'text',
    });
  }
  verifyOtp(payload: { code: string; token: string }) {
    return this.http.post(`${API_BASE_URL}/auth/verify-otp`, payload, {
      responseType: 'text',
    });
  }

  changePassword(
    newPassword: string,
    reNewPassword: string,
    token?: string | null
  ) {
    return this.http.post(
      `${API_BASE_URL}/auth/reset-password`,
      {
        token,
        newPassword,
      },
      {
        responseType: 'text',
      }
    );
  }

  logout() {
    this.tokenStorageService.clear();
    this.currentUserSubject.next(null);
  }

  isTokenExpired() {
    if (!this.currentUserValue?.token) {
      return true;
    }
    const expiry = JSON.parse(
      atob(this.currentUserValue?.token.split('.')[1])
    ).exp;

    return expiry * 1000 < Date.now();
  }

  updateUser(field: string, value: any) {
    // send post request here and change localstorage after if success
    const user: User | null = this.tokenStorageService.setUserField(field, value);
    this.currentUserSubject.next(user);
  }
}
