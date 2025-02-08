import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../models/order.model';
import { environment } from '../../enviroronments/environment.env';
import { NewOrder } from '../models/new-order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

  
  getOrdersByCustomerId(customerId: number): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/client-orders/${customerId}`);
  }

  createOrder(orderData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/orders`, orderData);
  }

}
