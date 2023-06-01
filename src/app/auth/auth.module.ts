import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { CreateAccountComponent } from './components/create-account/create-account.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { OtpComponent } from './components/otp/otp.component';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ValidatedInputComponent } from '../shared/components/validated-input/validated-input.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    LoginComponent,
    CreateAccountComponent,
    ChangePasswordComponent,
    OtpComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    ValidatedInputComponent,
    MatFormFieldModule,
    MatInputModule,
  ],
})
export class AuthModule {}
