import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OperationRoutingModule } from './operation-routing.module';
import { CreancierlistComponent } from './components/creancierlist/creancierlist.component';
import { MainComponent } from './components/main/main.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
@NgModule({
  declarations: [CreancierlistComponent, MainComponent],
  imports: [
    CommonModule,
    OperationRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatSelectModule,
  ],
})
export class OperationModule {}
