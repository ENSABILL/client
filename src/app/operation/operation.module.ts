import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OperationRoutingModule } from './operation-routing.module';
import { CreancierlistComponent } from './components/creancierlist/creancierlist.component';


@NgModule({
  declarations: [
    CreancierlistComponent
  ],
  imports: [
    CommonModule,
    OperationRoutingModule
  ]
})
export class OperationModule { }
