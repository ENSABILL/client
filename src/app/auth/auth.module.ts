import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { CreateAccountComponent } from './components/create-account/create-account.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { OtpComponent } from './components/otp/otp.component';


@NgModule({
  declarations: [
    LoginComponent,
    CreateAccountComponent,
    ResetPasswordComponent,
    OtpComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
