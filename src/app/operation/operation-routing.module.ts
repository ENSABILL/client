import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: MainComponent,
      },
      // {
      //   path: '/recharge/:name',
      //   component: MainComponent,
      // },
      // {
      //   path: '/facture/:name',
      //   component: MainComponent,
      // },
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
