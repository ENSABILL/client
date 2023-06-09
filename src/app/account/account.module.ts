import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { ProfileComponent } from './components/profile/profile.component';
import { MatIconModule } from '@angular/material/icon';
import { QstAnswerComponent } from './components/qst-answer/qst-answer.component';
import { OrdersComponent } from './components/orders/orders.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ValidatedInputComponent } from '../shared/components/validated-input/validated-input.component';
import { MatButtonModule } from '@angular/material/button';
import { HistoryComponent } from './components/history/history.component';
import { OrdersHistoryComponent } from './components/orders-history/orders-history.component';
import { TableComponent } from '../shared/components/table/table.component';

@NgModule({
  declarations: [
    ProfileComponent,
    QstAnswerComponent,
    OrdersComponent,
    ChangePasswordComponent,
    HistoryComponent,
    OrdersHistoryComponent,
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    ValidatedInputComponent,
    MatButtonModule,
    TableComponent
  ],
})
export class AccountModule {}
