import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/services/auth.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { Operation } from '../../models/operation.model';
import { OperationService } from '../../services/operation.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-payment-modal',
  templateUrl: './payment-modal.component.html',
  styleUrls: ['./payment-modal.component.css'],
})
export class PaymentModalComponent {
  @ViewChild('checkoutModal') checkoutModal: any;
  @Input() selectedOperations: any[] = [];
  @Input() displayedColumns: {
    value: string[];
    name: string;
    class?: string;
  }[] = [];
  @Input() operationType: 'RECHARGE' | 'FACTURE' | 'DONATION' = 'FACTURE';
  @Input() total: number = 0;
  token: string = '';

  constructor(
    private authService: AuthService,
    private modalService: NgbModal,
    private router: Router,
    private alertService: AlertService,
    private toastr: ToastrService,
    private operationService: OperationService
  ) {}

  openModalFunction(token: string) {
    this.token = token;
    this.modalService.open(this.checkoutModal, {
      centered: true,
      scrollable: true,
    });
  }

  checkout() {
    switch (this.operationType) {
      case 'FACTURE':
        this.payFactures();
        break;
      case 'DONATION':
        console.log('pay donation');
        break;
      case 'RECHARGE':
        console.log('pay recharge');
        break;
      default:
        break;
    }
  }

  payFactures() {
    const operationsIds = this.selectedOperations.map((op) => op.id);
    const creancierId = this.selectedOperations[0].service.id;

    this.operationService
      .payFactures(creancierId, operationsIds, this.token)
      .pipe(first())
      .subscribe({
        next: (response) => {
          this.alertService.success(
            'Your payment went successfully, thanks for using our service !',
            {
              keepAfterRouteChange: true,
            }
          );
          this.modalService.dismissAll();
          this.router.navigate(['/', 'operations']);
        },
        error: (error) => {
          this.alertService.error(
            error ||
              'an error occured while processing payment! try again later',
            {
              keepAfterRouteChange: true,
            }
          );
          this.modalService.dismissAll();
          this.router.navigate(['/', 'operations']);
        },
      });
  }
}
