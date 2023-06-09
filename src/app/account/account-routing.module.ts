import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';
import { QstAnswerComponent } from './components/qst-answer/qst-answer.component';
import { OrdersComponent } from './components/orders/orders.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { HistoryComponent } from './components/history/history.component';

const routes: Routes = [
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'qa',
    component: QstAnswerComponent,
  },
  {
    path: 'orders',
    component: OrdersComponent,
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent,
  },
  {
    path: 'history',
    component: HistoryComponent
  },
  {
    path: 'orders',
    component: OrdersComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountRoutingModule {}
