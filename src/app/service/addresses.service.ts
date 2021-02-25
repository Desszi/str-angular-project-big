import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Address } from 'app/model/address';
import { ConfigService } from './config.service';
import { BaseService } from './base.service';


@Injectable({
  providedIn: 'root'
})
export class AddressesService extends BaseService<Address> {
  constructor(private httpClient: HttpClient) {
    super(new ConfigService('http://localhost:3000'), httpClient, "addresses");
  }
}

