import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreancierlistComponent } from './components/creancierlist/creancierlist.component';

const routes: Routes = [
  {
    path: "",component: CreancierlistComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OperationRoutingModule { }
