import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs';
import { AlertService } from 'src/app/shared/services/alert.service';
import { passwordMatchValidator } from 'src/app/shared/validators/passwordMatch.validator';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent {
  token?: string | null;
  changePassForm = new FormGroup(
    {
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      rePassword: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    },
    {
      validators: passwordMatchValidator,
    }
  );
  loading: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private alertService: AlertService
  ) {
    this.token = this.router.getCurrentNavigation()?.extras.state?.['token'];
    if (this.authService.isTokenExpired()) {
      this.authService.logout();
      this.router.navigate(['/', 'auth', 'login']);
    }
    if (!authService.currentUser) {
      this.router.navigate(['/', 'auth', 'login']);
    }
    if (!authService.currentUserValue?.firstLogin) {
      this.router.navigate(['/']);
    }
    if (!this.token) {
      this.router.navigate(['/']);
    }
  }

  showPassMatchError() {
    const { touched, dirty } = this.changePassForm.controls.rePassword;
    return touched && dirty && this.changePassForm.getError('notMatch');
  }

  onSubmit() {
    if (this.changePassForm.invalid) {
      return;
    }
    this.loading = true;

    const newPassword = this.changePassForm.controls.password.value || '';
    const reNewPassword = this.changePassForm.controls.rePassword.value || '';

    this.authService
      .changePassword(newPassword, reNewPassword, this.token)
      .pipe(first())
      .subscribe({
        next: (message) => {
          this.loading = false;
          this.authService.updateUser('firstLogin', false);
          this.alertService.success(message);
          this.router.navigate(['/']);
        },
        error: (error) => {
          this.loading = false;
          this.alertService.error(error);
        },
      });
  }
}
