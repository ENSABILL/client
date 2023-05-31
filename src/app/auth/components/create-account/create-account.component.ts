import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { AlertService } from 'src/app/shared/services/alert.service';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css'],
})
export class CreateAccountComponent {
  signUpForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    dob: new FormControl([Validators.required]),
    CIN: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(06|07)\d{8}$/),
    ]),
  });
  loading: boolean = false;

  constructor(
    private alertService: AlertService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    if (this.authService.currentUserValue) {
      console.log(authService.currentUserValue);
      this.router.navigate(['/']);
    }
  }

  onSubmit() {
    if (this.signUpForm.invalid) {
      return;
    }
    this.loading = true;

    const fields = [
      'username',
      'firstName',
      'lastName',
      'dob',
      'CIN',
      'email',
      'phoneNumber',
    ];
    const payload: any = {};
    for (const field of fields) {
      payload[field] = this.signUpForm.get(field)?.value;
    }

    payload['dob'] = formatDate(String(payload['dob']), 'dd/MM/yyyy', 'en');
    payload['phoneNumber'] = '+212' + payload['phoneNumber'];
    this.authService
      .register(payload)
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.success(
            'Thank you for registering. You registration request will be taken in consideration'
          );
          this.loading = false;
          this.signUpForm.reset();
        },
        error: (error) => {
          this.loading = false;
          this.alertService.error(error);
        },
      });
  }
}
