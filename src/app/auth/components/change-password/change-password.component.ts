import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent {
  token?: string;
  constructor(private router: Router, private authService: AuthService) {
    if (!authService.currentUser) {
      this.router.navigate(['/', 'auth', 'login']);
    }
    if (!authService.currentUserValue?.firstLogin) {
      this.router.navigate(['/']);
    }
  }
}
