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
  constructor(httpClient: HttpClient, config:ConfigService) {
    super(config, httpClient, "addresses");
  }

  columns:Column[] = [
    {index:0, name:'id', title:'#', type:'text'},
    {index:1, name:'zip', title:'IRÁNYÍTÓSZÁM', type:'text'},
    {index:2, name:'country', title:'MEGYE', type:'text'},
    {index:3, name:'city', title:'VÁROS', type:'text'},
    {index:4, name:'street', title:'UTCA', type:'text'},
    {index:5, name:'notes', title:'MEGJEGYZÉS', type:'text'},
    {index:6, name:'edit', title:'SZERK.', type:'btn-edit'},
    {index:7, name:'delete', title:'TÖRL.', type:'btn-trash'},
  ]
}

