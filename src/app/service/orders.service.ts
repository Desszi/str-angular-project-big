import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Order } from 'app/model/order';
import { BaseService } from './base.service';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class OrdersService extends BaseService<Order> {
  constructor(httpClient: HttpClient, config:ConfigService) {
    super(config, httpClient, "orders");
  }
}