import { Injectable } from '@angular/core';
import { Observable, Subject, filter } from 'rxjs';
import { ALertOptions, Alert, AlertType } from '../models/alert.model';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private subject = new Subject<Alert>();
  private defaultId = 'default-alert';

  onAlert(id = this.defaultId): Observable<Alert> {
    return this.subject.asObservable().pipe(filter((x) => x.id == id));
  }

  alert(alert: Alert) {
    alert.id = alert.id || this.defaultId;
    this.subject.next(alert);
  }
  success(message: string, options?: ALertOptions) {
    this.alert(
      new Alert({
        ...options,
        type: AlertType.Success,
        message,
      })
    );
  }
  error(message: string, options?: ALertOptions) {
    this.alert(
      new Alert({
        ...options,
        type: AlertType.Error,
        message,
      })
    );
  }
  warning(message: string, options?: ALertOptions) {
    this.alert(
      new Alert({
        ...options,
        type: AlertType.Warning,
        message,
      })
    );
  }
  info(message: string, options?: ALertOptions) {
    this.alert(
      new Alert({
        ...options,
        type: AlertType.Info,
        message,
      })
    );
  }

  clear(id = this.defaultId) {
    this.subject.next(new Alert({ id }));
  }
}
