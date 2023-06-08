import { Component, ViewChild } from '@angular/core';
import { Donation } from '../../models/donation.model';
import { User } from 'src/app/auth/models/user.model';
import { Creancier } from '../../models/creancier.model';
import { CreancierService } from '../../services/creancier.service';
import { OperationService } from '../../services/operation.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/shared/services/alert.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-donation',
  templateUrl: './donation.component.html',
  styleUrls: ['./donation.component.css'],
})
export class DonationComponent {
  currentUser: User | null;
  id: string = '';
  donationForm = new FormGroup({
    donor: new FormControl('', [Validators.required]),
    total: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[1-9]\d*$/),
    ]),
  });
  date?: string;
  @ViewChild('otpModal') otpModal: any;
  @ViewChild('checkoutModal') checkoutModal: any;

  creancier?: Creancier;
  constructor(
    private creancierService: CreancierService,
    private operationService: OperationService,
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private alertService: AlertService,
    private modalService: NgbModal
  ) {
    this.currentUser = this.authService?.currentUserValue;
    this.donationForm.controls.donor.setValue(this.currentUser?.fullName || '');
  }

  ngOnInit(): void {
    const creancierId = this.activatedRoute.snapshot.paramMap.get('id');
    if (!creancierId) {
      this.alertService.warning('Creancier Not Found', {
        keepAfterRouteChange: true,
      });
      this.router.navigate(['/', 'operations']);
    }
    this.creancierService
      .getCreancier(creancierId || '')
      .pipe(first())
      .subscribe({
        next: (creancier) => {
          this.creancier = creancier;
        },
        error: (err) => {
          this.alertService.error(err, {
            keepAfterRouteChange: true,
          });
          this.router.navigate(['/', 'operations']);
        },
      });
  }

  showAcceptPayment(content: any) {
    this.alertService.clear();
    this.date = new Date().toLocaleString();
    if (this.donationForm?.invalid) {
      return;
    }
    if (parseInt(this.donationForm?.controls.total.value || '0') > 0) {
      this.modalService.open(content, {
        scrollable: true,
        centered: true,
      });
    }
  }

  

  openOtpModal() {
    this.otpModal.openModalFunction();
  }

  openCheckoutModal(token: string) {
    this.checkoutModal.openModalFunction(token);
  }
}
