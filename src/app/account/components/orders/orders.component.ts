import { Component } from '@angular/core';
import { first } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Order } from 'src/app/operation/models/order.model';
import { OperationService } from 'src/app/operation/services/operation.service';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent {
  paidOrders: Order[] = [];
  loading: boolean = false;

  constructor(
    private alertService: AlertService,
    private operationService: OperationService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.operationService
      .getOrders()
      .pipe(first())
      .subscribe({
        next: (orders: Order[]) => {
          this.loading = false;
          this.paidOrders = orders;
        },
        error: (error) => {
          this.loading = false;
          this.alertService.error(error);
        },
      });
  }
}
