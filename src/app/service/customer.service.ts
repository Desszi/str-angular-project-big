import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
}