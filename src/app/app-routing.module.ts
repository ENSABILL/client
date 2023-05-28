import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotfoundComponent } from './shared/components/notfound/notfound.component';
import { ProfileComponent } from './profile/profile.component';
import { HistoriqueComponent } from './operation/components/historique/historique.component';
import { PayerFactureComponent } from './payer-facture/payer-facture.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'account',
    loadChildren: () =>
      import('./account/account.module').then((m) => m.AccountModule),
  },
  {
    path: 'operations',
    loadChildren: () =>
      import('./operation/operation.module').then((m) => m.OperationModule),
  },
  {path : 'historique' , component: HistoriqueComponent},
  {path : 'payment', component : PayerFactureComponent},
  {path:'profile', component : ProfileComponent},
  { path: '**', component: NotfoundComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
