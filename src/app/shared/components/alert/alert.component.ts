import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Alert, AlertType } from '../../models/alert.model';
import { NavigationStart, Router } from '@angular/router';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
})
export class AlertComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();

  @Input() id = 'default-alert';
  @Input() fade = true;

  alerts: Alert[] = [];

  constructor(private router: Router, private alertService: AlertService) {}

  ngOnInit(): void {
    this.alertService
      .onAlert(this.id)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((alert) => {
        if (!alert.message) {
          this.alerts = this.alerts.filter((x) => x.keepAfterRouteChange);

          this.alerts.forEach((x) => delete x.keepAfterRouteChange);
          return;
        }

        this.alerts.push(alert);
        if (alert.autoClose) {
          setTimeout(() => this.removeAlert(alert), 3000);
        }
      });

    this.router.events.pipe(takeUntil(this.unsubscribe$)).subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.alertService.clear(this.id);
      }
    });
  }

  removeAlert(alert: Alert) {
    if (!this.alerts.includes(alert)) return;

    const timeout = this.fade ? 250 : 0;
    alert.fade = this.fade;

    setTimeout(() => {
      this.alerts = this.alerts.filter((x) => x !== alert);
    }, timeout);
  }

  cssClass(alert: Alert) {
    if (!alert) return;
    const classes = ['alert', 'alert-dismissible'];

    const alertTypeClass = {
      [AlertType.Success]: 'alert-success',
      [AlertType.Error]: 'alert-danger',
      [AlertType.Info]: 'alert-info',
      [AlertType.Warning]: 'alert-warning',
    };
    if (alert.type !== undefined) {
      classes.push(alertTypeClass[alert.type]);
    }
    if (alert.fade) {
      classes.push('fade');
    }

    return classes.join(' ');
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
