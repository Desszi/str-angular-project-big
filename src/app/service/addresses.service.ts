import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Address } from 'app/model/address';
import { ConfigService } from './config.service';
import { BaseService } from './base.service';
import { Column } from 'app/model/column';


@Injectable({
  providedIn: 'root'
})
export class AddressesService extends BaseService<Address> {
  constructor(httpClient: HttpClient, config: ConfigService) {
    super(config, httpClient, "addresses");
  }

  columns: Column[] = [
    { index: 0, name: 'id', title: '#', type: 'text', sortDir: '', footer: false },
    { index: 1, name: 'zip', title: 'IRÁNYÍTÓSZÁM', type: 'text', sortDir: '', footer: false },
    { index: 2, name: 'country', title: 'ORSZÁG', type: 'text', sortDir: '', footer: false },
    { index: 3, name: 'city', title: 'VÁROS', type: 'text', sortDir: '', footer: false },
    { index: 4, name: 'street', title: 'UTCA', type: 'text', sortDir: '', footer: false },
    { index: 5, name: 'notes', title: 'MEGJEGYZÉS', type: 'text', sortDir: '', footer: false },
  ]
}

