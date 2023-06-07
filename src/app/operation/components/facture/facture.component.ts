import { Component, OnInit } from '@angular/core';
import { CreancierService } from '../../services/creancier.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from 'src/app/auth/models/user.model';
import { Creancier } from '../../models/creancier.model';
import { ActivatedRoute, Router } from '@angular/router';
import { first, of, throwError } from 'rxjs';
import { AlertService } from 'src/app/shared/services/alert.service';
import { OperationService } from '../../services/operation.service';
import { Operation } from '../../models/operation.model';

@Component({
  selector: 'app-facture',
  templateUrl: './facture.component.html',
  styleUrls: ['./facture.component.css'],
})
export class FactureComponent implements OnInit {
  currentUser: User | null;
  id: string = '';
  unpaidOperations: Operation[] = [];
  selectedOperations: Operation[] = [];
  total: number = 0;

  creancier?: Creancier;
  constructor(
    private creancierService: CreancierService,
    private operationService: OperationService,
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private alertService: AlertService
  ) {
    this.currentUser = this.authService?.currentUserValue;
  }

  ngOnInit(): void {
    const creancierId = this.activatedRoute.snapshot.paramMap.get('id');
    this.creancierService
      .getCreancier(creancierId || '')
      .pipe(first())
      .subscribe({
        next: (creancier) => {
          this.creancier = creancier;
        },
        error: (err) => {
          this.router.navigate(['/', 'operations']);
          this.alertService.error(err);
        },
      });

    this.operationService
      .getUnpaidOperations(creancierId)
      .pipe(first())
      .subscribe({
        next: (unpaidOperations) => {
          console.log(unpaidOperations);
          this.unpaidOperations = unpaidOperations;
          console.log(this.unpaidOperations);
        },
        error: (error) => {
          this.alertService.error(error);
        },
      });
  }

  toggleOperation({
    operationId,
    typeToggle,
  }: {
    operationId: string;
    typeToggle: 'select' | 'unselect';
  }) {
    switch (typeToggle) {
      case 'select':
        const operation = this.unpaidOperations.find(
          (operation) => operation.id == operationId
        );

        if (operation) {
          this.selectedOperations = [...this.selectedOperations, operation];
        }
        this.calculateTotal();
        break;

      case 'unselect':
        this.selectedOperations = this.selectedOperations.filter(
          (operation) => operation.id != operationId
        );
        this.calculateTotal();
        break;

      default:
        break;
    }
  }

  calculateTotal() {
    this.total = 0;
    for (let operation of this.selectedOperations) {
      this.total += operation.amount;
    }
  }
  toggleAllOperations(typeToggle: 'select' | 'unselect') {
    switch (typeToggle) {
      case 'select':
        this.selectedOperations = this.unpaidOperations;
        this.calculateTotal();
        break;
      case 'unselect':
        this.selectedOperations = [];
        this.calculateTotal();
        break;
      default:
        break;
    }
  }

  showOtpModal() {
    console.log('otp modal');
  }
}
