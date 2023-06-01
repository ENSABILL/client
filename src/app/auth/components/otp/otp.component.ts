import { Component, OnDestroy, OnInit, ViewChildren } from '@angular/core';
import { User } from '../../models/user.model';
import { Subject, first, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css'],
})
export class OtpComponent implements OnInit, OnDestroy {
  currentUser: User | null = null;
  unsubscribe$: Subject<null> = new Subject<null>();
  title = 'otp';
  form: FormGroup;
  token: string | null = null;
  formInput = ['input1', 'input2', 'input3', 'input4'];
  loading: boolean = false;
  @ViewChildren('formRow') rows: any;

  constructor(
    private router: Router,
    private authService: AuthService,
    private alertService: AlertService
  ) {
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
    this.authService.currentUser
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((x) => (this.currentUser = x));
    this.form = this.toFormGroup(this.formInput);
  }

  toFormGroup(elements: string[]) {
    const group: any = {};

    elements.forEach((key) => {
      group[key] = new FormControl('', [
        Validators.required,
        Validators.pattern(/^[0-9]$/),
      ]);
    });
    return new FormGroup(group);
  }

  showError() {
    let [touched, dirty, errors] = [false, false, {}];
    Object.keys(this.form.controls).forEach((key) => {
      const {
        touched: controlTouched,
        dirty: controlDirty,
        errors: controlErrors,
      } = this.form.get(key) as FormControl;
      touched = touched || controlTouched;
      dirty = dirty || controlDirty;
      Object.assign(errors, controlErrors);
    });
    return touched && dirty && Object.keys(errors).length;
  }

  hasRequiredError(): boolean {
    let invalid = false;
    Object.keys(this.form.controls).forEach((key) => {
      invalid = invalid || this.form.get(key)?.getError('required');
    });
    return invalid;
  }

  hasPatternError(): boolean {
    let invalid = false;
    Object.keys(this.form.controls).forEach((key) => {
      invalid = invalid || this.form.get(key)?.getError('pattern');
    });
    return invalid;
  }

  keyUpEvent(event: KeyboardEvent, index: number) {
    let pos = index;
    if (event.keyCode === 8 && event.which === 8) {
      pos = index - 1;
    } else {
      pos = index + 1;
    }
    if (pos > -1 && pos < this.formInput.length) {
      this.rows._results[pos].nativeElement.focus();
    }
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    const otpCode = Object.values(this.form.value).join('');
    this.loading = true;
    this.authService
      .verifyOtp({
        code: otpCode,
        token: this.token!,
      })
      .pipe(first())
      .subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['/', 'auth', 'change-password'], {
            state: {
              token: this.token,
            },
          });
        },
        error: (error) => {
          this.loading = false;
          this.alertService.error(error || 'Your otp code is not valid.');
        },
      });
  }

  ngOnInit(): void {
    // remove this if condition in production
    // if (false) {
      this.authService
        .sendOtp()
        .pipe(first())
        .subscribe({
          next: (token) => {
            this.alertService.success('otp code sent successfully');
            this.token = token;
          },
          error: (error) => {
            console.log(error);
            this.token = null;
            this.alertService.error(error);
          },
        });
    // }
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }
}
