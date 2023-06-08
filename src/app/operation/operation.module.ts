import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OperationRoutingModule } from './operation-routing.module';
import { CreancierlistComponent } from './components/creancierlist/creancierlist.component';
import { MainComponent } from './components/main/main.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { FactureComponent } from './components/facture/facture.component';
import { DonationComponent } from './components/donation/donation.component';
import { RechargeComponent } from './components/recharge/recharge.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ValidatedInputComponent } from '../shared/components/validated-input/validated-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MultiSelectTableComponent } from '../shared/components/multi-select-table/multi-select-table.component';
import { OtpModalComponent } from './components/otp-modal/otp-modal.component';
import { PaymentModalComponent } from './components/payment-modal/payment-modal.component';
import { TableComponent } from '../shared/components/table/table.component';
import { HistoryComponent } from './components/history/history.component';

@NgModule({
  declarations: [
    CreancierlistComponent,
    MainComponent,
    FactureComponent,
    DonationComponent,
    RechargeComponent,
    OtpModalComponent,
    PaymentModalComponent,
    HistoryComponent,
  ],
  imports: [
    CommonModule,
    OperationRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatProgressSpinnerModule,
    ValidatedInputComponent,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MultiSelectTableComponent,
    TableComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class OperationModule {}
