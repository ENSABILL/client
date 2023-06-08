import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { User } from 'src/app/auth/models/user.model';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Creancier } from '../../models/creancier.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/shared/services/alert.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-otp-modal',
  templateUrl: './otp-modal.component.html',
  styleUrls: ['./otp-modal.component.css'],
})
export class OtpModalComponent {
  currentUser: User | null;
  @Input() total: number = 0;
  @Input() creancier?: Creancier | null;
  @ViewChild('otpModal') otpModal: any;
  token: string | null = null;
  form: FormGroup;
  formInput = ['input1', 'input2', 'input3', 'input4'];
  loading: boolean = false;

  constructor(
    private authService: AuthService,
    private modalService: NgbModal,
    private router: Router,
    private alertService: AlertService,
    private toastr: ToastrService
  ) {
    this.currentUser = this.authService?.currentUserValue;
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

  openModalFunction() {
    this.modalService.open(this.otpModal, {
      centered: true,
      scrollable: true,
    });
    // if (false) {
    alert;
    this.authService
      .sendOtp()
      .pipe(first())
      .subscribe({
        next: (token) => {
          // add toast
          this.toastr.success(
            'your otp code has been sent successfully',
            'Check your phone!'
          );
          this.token = token;
        },
        error: (error) => {
          console.log(error);
          // add toast
          this.toastr.error('something went wrong! sending otp code failed',"ssss");
          this.token = null;
        },
      });
    // }
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
          // this.alertService.error(error || 'Your otp code is not valid.');
        },
      });
  }
}
