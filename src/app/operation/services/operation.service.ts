import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { environment } from 'src/environments/environment';
import { Operation } from '../models/operation.model';

const { API_BASE_URL } = environment;

@Injectable({
  providedIn: 'root',
})
export class OperationService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  getUnpaidOperations(creancierId?: string | null) {
    if (creancierId) {
      return this.http.get<Operation[]>(
        `${API_BASE_URL}/operation/unpaidBills?serviceId=${creancierId}`
      );
    }
    return this.http.get<Operation[]>(`${API_BASE_URL}/operation/unpaidBills`);
  }

  getPaidOperations() {
    return this.http.get<Operation[]>(`${API_BASE_URL}/operation/paidBills`);
  }

  payFactures(creancierId: string, operationsIds: string[], token?: string) {
    return this.http.post<Operation[]>(`${API_BASE_URL}/operation/pay-bills`, {
      operationsIds,
      serviceId: creancierId,
      token,
    });
  }
}
