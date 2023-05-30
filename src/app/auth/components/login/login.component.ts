import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/shared/services/alert.service';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  loading: boolean = false;

  constructor(
    private alertService: AlertService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    if (this.authService.currentUserValue) {
      console.log(authService.currentUserValue)
      this.router.navigate(['/']);
    }
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;

    const username = this.loginForm.controls.username.value || '';
    const password = this.loginForm.controls.password.value || '';

    this.authService
      .login(username, password)
      .pipe(first())
      .subscribe({
        next: () => {
          const returnUrl: string = this.route.snapshot.queryParams['returnUrl'] || '/';
          
          this.router.navigate(["/","operations"]);
          this.loading = false;
        },
        error: error => {
          this.loading = false;
          this.alertService.error(error);
        }
      });
  }
}
