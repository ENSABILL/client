import { Component, ViewChild } from '@angular/core';
import { Creancier } from '../../models/creancier.model';
import { User } from 'src/app/auth/models/user.model';
import { CreancierService } from '../../services/creancier.service';
import { OperationService } from '../../services/operation.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/shared/services/alert.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs';
import { Recharge } from '../../models/recharge.model';

@Component({
  selector: 'app-recharge',
  templateUrl: './recharge.component.html',
  styleUrls: ['./recharge.component.css'],
})
export class RechargeComponent {
  currentUser: User | null;
  id: string = '';
  recharges: Recharge[] = [];
  selectedRecharges: Recharge[] = [];
  total: number = 0;
  date?: string;
  selectedRecharge = '5';
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
  }

  ngOnInit(): void {
    const creancierId = this.activatedRoute.snapshot.paramMap.get('id');
    if (!creancierId) {
      this.alertService.warning('Creancier Not Found', {
        keepAfterRouteChange: true,
      });
      this.router.navigate(['/', 'operations', 'creanciers']);
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

  addRecharge() {
    this.recharges = [
      ...this.recharges,
      new Recharge(
        this.recharges.length + 1,
        parseInt(this.selectedRecharge),
        this.creancier?.id
      ),
    ];
  }

  toggleOperation({
    operationId: rechargeId,
    typeToggle,
  }: {
    operationId: number;
    typeToggle: 'select' | 'unselect';
  }) {
    switch (typeToggle) {
      case 'select':
        const recharge = this.recharges.find(
          (recharge) => recharge.id == rechargeId
        );

        if (recharge) {
          this.selectedRecharges = [...this.selectedRecharges, recharge];
        }
        console.log(this.selectedRecharges);
        this.calculateTotal();
        break;

      case 'unselect':
        this.selectedRecharges = this.selectedRecharges.filter(
          (recharge) => recharge.id != rechargeId
        );
        this.calculateTotal();
        break;

      default:
        break;
    }
  }

  calculateTotal() {
    this.total = 0;
    for (let recharge of this.selectedRecharges) {
      this.total += recharge.amount;
    }
  }
  toggleAllOperations(typeToggle: 'select' | 'unselect') {
    switch (typeToggle) {
      case 'select':
        this.selectedRecharges = this.recharges;
        this.calculateTotal();
        break;
      case 'unselect':
        this.selectedRecharges = [];
        this.calculateTotal();
        break;
      default:
        break;
    }
  }

  showAcceptPayment(content: any) {
    this.alertService.clear();
    this.date = new Date().toLocaleString();

    if (this.total > 0) {
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
