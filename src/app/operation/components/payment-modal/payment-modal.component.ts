import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/services/auth.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { Operation } from '../../models/operation.model';
import { OperationService } from '../../services/operation.service';

@Component({
  selector: 'app-payment-modal',
  templateUrl: './payment-modal.component.html',
  styleUrls: ['./payment-modal.component.css'],
})
export class PaymentModalComponent{
  @ViewChild('checkoutModal') checkoutModal: any;
  @Input() selectedOperations: any[] = [];
  @Input() displayedColumns: {value: string[], name: string, class?: string} [] = [];
  @Input() operationType: 'RECHARGE' | 'FACTURE' | 'DONATION' = 'FACTURE';
  token: string = '';

  constructor(
    private authService: AuthService,
    private modalService: NgbModal,
    private router: Router,
    private alertService: AlertService,
    private toastr: ToastrService,
    private operationService: OperationService
  ) {

  }


 

  openModalFunction(token: string) {
    console.log(this.selectedOperations)
    console.log(token)
    this.token = token;
    this.modalService.open(this.checkoutModal, {
      centered: true,
      scrollable: true,
    });
  }

  checkout() {}
}
