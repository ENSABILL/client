import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
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

  logout() {
    this.tokenStorageService.clear();
    this.currentUserSubject.next(null);
  }
}
