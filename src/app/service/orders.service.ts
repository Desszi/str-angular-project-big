import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Order } from 'app/model/order';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  apiUrl: string = 'http://localhost:3000/orders';
  orderList$: BehaviorSubject<Order[]> = new BehaviorSubject<Order[]>([]);



  constructor(
    private http: HttpClient
  ) { }

  getAll(): void {

    this.http.get<Order[]>(this.apiUrl).subscribe(
      orders => this.orderList$.next(orders)
    );
  }
}
