import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { CreateAccountComponent } from './components/create-account/create-account.component';
import { OtpComponent } from './components/otp/otp.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { AuthGuard } from '../_helpers/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: CreateAccountComponent,
  },
  {
    path: 'otp',
    component: OtpComponent,
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
