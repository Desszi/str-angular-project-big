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
    {index:1, name:'customerID', title:'Vásárló az.', type:'text', sortDir:''},
    {index:2, name:'productID', title:'Termék az.', type:'text', sortDir:''},
    {index:3, name:'amount', title:'Összeg', type:'text', sortDir:''},
    {index:4, name:'status', title:'Állapot', type:'text', sortDir:''},
  ]
}
//"id": 1,
//"customerID": 33,
//  "productID": 30,
//    "amount": 49,
//      "status": "paid"
