import { Component, ViewChild } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/shared/services/alert.service';
import { User } from 'src/app/auth/models/user.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent {
  currentUser: User | null;
  id: string = '';
  productForm = new FormGroup({
    quantity: new FormControl(1, [
      Validators.required,
      Validators.min(1),
      Validators.pattern(/^[1-9]\d*$/),
    ]),
  });
  date?: string;
  @ViewChild('otpModal') otpModal: any;
  @ViewChild('checkoutModal') checkoutModal: any;

  product?: Product;
  constructor(
    private productService: ProductService,
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private alertService: AlertService,
    private modalService: NgbModal
  ) {
    this.currentUser = this.authService?.currentUserValue;
  }

  ngOnInit(): void {
    const productId = this.activatedRoute.snapshot.paramMap.get('id');
    if (!productId) {
      this.alertService.warning('Product Not Found', {
        keepAfterRouteChange: true,
      });
      this.router.navigate(['/', 'operations', 'products']);
    }
    this.productService
      .getProduct(productId || '')
      .pipe(first())
      .subscribe({
        next: (product) => {
          this.product = product;
          this.productForm.controls['quantity'].addValidators([
            Validators.max(product.qte || 0),
          ]);
        },
        error: (err) => {
          this.alertService.error(err, {
            keepAfterRouteChange: true,
          });
          this.router.navigate(['/', 'operations','creanciers']);
        },
      });
  }

  showAcceptPayment(content: any) {
    this.alertService.clear();
    this.date = new Date().toLocaleString();
    if (this.productForm?.invalid) {
      return;
    }
    if ((this.productForm?.controls.quantity.value || 0) > 0) {
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
