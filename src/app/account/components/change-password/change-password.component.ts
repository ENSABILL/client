import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent {
  token?: string | null;
  changePassForm = new FormGroup({
    oldPassword: new FormControl('', [Validators.required]),
    newPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });
  loading: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private alertService: AlertService
  ) {}

  onSubmit() {
    if (this.changePassForm.invalid) {
      return;
    }
    this.loading = true;

    const oldPassword = this.changePassForm.controls.oldPassword.value || '';
    const newPassword = this.changePassForm.controls.newPassword.value || '';

    this.authService
      .changePasswordFromProfile(oldPassword, newPassword)
      .pipe(first())
      .subscribe({
        next: (message) => {
          this.loading = false;
          
          this.alertService.success('password changed successfully');
        },
        error: (error) => {
          this.loading = false;
          this.alertService.error(error);
        },
      });
  }
}
