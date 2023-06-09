import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs';
import { User } from 'src/app/auth/models/user.model';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Operation } from 'src/app/operation/models/operation.model';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  currentUser?: any | null;
  public historiques: Operation[] = [];

  public showList: boolean = false;


  constructor(
    private authService: AuthService,
    private alertService: AlertService
  ) {
    this.currentUser = this.authService.getClientProfile();
  }

  ngOnInit(): void {
      this.authService.getClientProfile()
      .pipe(first())
      .subscribe({
        next: (client) => {
          this.currentUser = client;
        },
        error: (error) => {
          this.alertService.error(error);
        }
      })
  }
}
