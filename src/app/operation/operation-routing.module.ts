import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { FactureComponent } from './components/facture/facture.component';
import { RechargeComponent } from './components/recharge/recharge.component';
import { DonationComponent } from './components/donation/donation.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: MainComponent,
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OperationRoutingModule {}
