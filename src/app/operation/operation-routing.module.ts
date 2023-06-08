import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { FactureComponent } from './components/facture/facture.component';
import { RechargeComponent } from './components/recharge/recharge.component';

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
      // {
      //   path: '/donation/:name',
      //   component: MainComponent,
      // },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OperationRoutingModule {}
