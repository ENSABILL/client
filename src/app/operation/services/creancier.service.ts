import { Injectable } from '@angular/core';
import { Creancier } from '../models/creancier.model';
import { Agency } from '../models/agency.model';
import { Rechargetype } from '../models/rechargetype.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/auth/services/auth.service';
import { environment } from 'src/environments/environment';

const { API_BASE_URL } = environment;

@Injectable({
  providedIn: 'root',
})
export class CreancierService {
  constructor(private http: HttpClient, private authService: AuthService) {
    
  }

  getAllCreanciers() {
    return this.http.get<Creancier[]>(`${API_BASE_URL}/service`);
  }

  getCreancier(id: string){
    return this.http.get<Creancier>(`${API_BASE_URL}/service/${id}`);
  }
}
