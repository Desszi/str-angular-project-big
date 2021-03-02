import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Column } from 'app/model/column';
import { Customer } from 'app/model/customer';
import { BehaviorSubject, of } from 'rxjs';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})

export class CustomerService extends BaseService<Customer> {
  constructor(httpClient: HttpClient, config:ConfigService) {
    super(config, httpClient, "customers");
  }

  columns:Column[] = [
    {index:0, name:'id', title:'#', type:'text', sortDir:''},
    {index:1, name:'firstName', title:'VEZETÉKNÉV', type:'text', sortDir:''},
    {index:2, name:'lastName', title:'KERESZTNÉV', type:'text', sortDir:''},    
    {index:3, name:'fullAddress', title:'CíM', type:'text', sortDir:''},
    {index:4, name:'email', title:'EMAIL', type:'text', sortDir:''},
    {index:5, name:'active', title:'AKTíV', type:'text', sortDir:''},
  ]
}