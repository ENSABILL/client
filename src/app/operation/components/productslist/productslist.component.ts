import { Component } from '@angular/core';
import { Product } from '../../models/product.model';
import { Subject, first, takeUntil } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { CreancierService } from '../../services/creancier.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { OperationService } from '../../services/operation.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-productslist',
  templateUrl: './productslist.component.html',
  styleUrls: ['./productslist.component.css'],
})
export class ProductslistComponent {
  selectedType: string = '';
  allProducts: Product[] = [];
  filteredProducts: Product[] = [];
  loading: boolean = false;
  unsubscribe$: Subject<void> = new Subject<void>();
  searchForm = new FormGroup({
    search: new FormControl('', []),
  });

  constructor(
    public productService: ProductService,
    private alerrtService: AlertService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.productService
      .getAllProducts()
      .pipe(first())
      .subscribe({
        next: (creanciers) => {
          this.loading = false;
          this.allProducts = creanciers;
          console.log(this.allProducts)
          this.filteredProducts = creanciers;
        },
        error: (err) => {
          this.loading = false;
          this.alerrtService.error(err);
        },
      });
    this.searchForm
      .get('search')
      ?.valueChanges.pipe(takeUntil(this.unsubscribe$))
      .subscribe((searchValue) => {
        this.handleTypeAndSearchChange();
      });
  }

  handleTypeAndSearchChange() {
    const searchKeyword = this.searchForm.controls.search.value || '';
    this.filteredProducts = this.allProducts.filter((product) =>
      searchKeyword
        ? product
            .name!.toLocaleLowerCase()
            .includes(searchKeyword.toLocaleLowerCase())
        : true
    );
  }

  onSubmit() {}
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
