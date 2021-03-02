import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Order } from 'app/model/order';
import { BaseService } from './base.service';
import { ConfigService } from './config.service';
import { Column } from 'app/model/column';

@Injectable({
  providedIn: 'root'
})
export class OrdersService extends BaseService<Order> {
  constructor(httpClient: HttpClient, config:ConfigService) {
    super(config, httpClient, "orders");
  }

  columns:Column[] = [
    {index:0, name:'id', title:'#', type:'text', sortDir:''},
    {index:1, name:'customerID', title:'VÁSÁRLÓ az.', type:'text', sortDir:''},
    {index:2, name:'productID', title:'TERMÉK az.', type:'text', sortDir:''},
    {index:3, name:'amount', title:'ÖSSZEG', type:'text', sortDir:''},
    {index:4, name:'status', title:'ÁLLAPOT', type:'text', sortDir:''},
  ]
}
