import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/shared/services/alert.service';
import { OperationService } from '../../services/operation.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { first } from 'rxjs';
import { Operation } from '../../models/operation.model';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
})
export class HistoryComponent implements OnInit {
  paidOperations: Operation[] = [];
  loading: boolean = false;

  constructor(
    private alertService: AlertService,
    private operationService: OperationService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.operationService
      .getPaidOperations()
      .pipe(first())
      .subscribe({
        next: (paidOperations: Operation[]) => {
          this.loading = false;
          this.paidOperations = paidOperations.map(
            (op) =>
              new Operation(
                op.id,
                op.amount,
                op.operationStatus,
                op.clientUsername,
                op.clientEmail,
                op.clientEmail,
                op.service,
                op.operationTime
              )
          );
        },
        error: (error) => {
          this.loading = false;
          this.alertService.error(error);
        },
      });
  }
}
