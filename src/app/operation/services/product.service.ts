import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Product } from '../models/product.model';
import { environment } from 'src/environments/environment';


const { API_BASE_URL } = environment;


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient, private authService: AuthService) {}

  getAllProducts(){
    return this.http.get<Product[]>(`${API_BASE_URL}/product`);
  }

  getProduct(productId: string){
    return this.http.get<Product>(`${API_BASE_URL}/product/${productId}`);
  }
}
