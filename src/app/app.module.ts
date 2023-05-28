import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { NotfoundComponent } from './shared/components/notfound/notfound.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { MatIconModule } from '@angular/material/icon';
import { ProfileComponent } from './profile/profile.component';
import { ModalComponent } from './modal/modal.component';
import { PayerFactureComponent } from './payer-facture/payer-facture.component';
import { RouterOutlet } from '@angular/router';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotfoundComponent,
    NavbarComponent,
    FooterComponent,
    ProfileComponent,
    ModalComponent,
    PayerFactureComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    RouterOutlet
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
