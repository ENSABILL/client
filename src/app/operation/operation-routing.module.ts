import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreanciersMainComponent } from './components/creanciersmain/creanciersmain.component';
import { FactureComponent } from './components/facture/facture.component';
import { RechargeComponent } from './components/recharge/recharge.component';
import { DonationComponent } from './components/donation/donation.component';
import { ProductslistComponent } from './components/productslist/productslist.component';
import { ProductComponent } from './components/product/product.component';

const routes: Routes = [
  {
    path: 'creanciers',
    children: [
      {
        path: '',
        component: CreanciersMainComponent,
      },
      {
        path: 'recharge/:id',
        component: RechargeComponent,
      },
      {
        path: 'facture/:id',
        component: FactureComponent,
      },
      {
        path: 'donation/:id',
        component: DonationComponent,
      },
    ],
  },
  {
    path: 'products',
    children: [
      {
        path: '',
        component: ProductslistComponent,
      },
      {
        path: ':id',
        component: ProductComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OperationRoutingModule {}
