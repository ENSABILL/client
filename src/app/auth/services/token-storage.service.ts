import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  constructor() {}

  getToken(): string {
    const user = this.getUser();
    return user ? user?.token : '';
  }

  getUserField(field: string) {
    const user = this.getUser();
    return user ? user[field as keyof User] : null;
  }

  getUser(): User | null {
    const user: User = JSON.parse(localStorage.getItem('user') || "{}");
    return Object.keys(user).length ? user : null;
  }
  setUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  clear() {
    localStorage.clear();
  }
}
