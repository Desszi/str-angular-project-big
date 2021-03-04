import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from 'app/model/product';
import { ConfigService } from './config.service';
import { BaseService } from './base.service';
import { Column } from 'app/model/column';

@Injectable({
  providedIn: 'root'
})
export class ProductsService extends BaseService<Product> {
  constructor(httpClient: HttpClient, config: ConfigService) {
    super(config, httpClient, "products");
  }

  columns: Column[] = [
    { index: 0, name: 'id', title: '#', type: 'text', sortDir: '',footer:false },
    { index: 1, name: 'name', title: 'NÉV', type: 'text', sortDir: '',footer:false},
    { index: 2, name: 'type', title: 'TÍPUS', type: 'text', sortDir: '',footer:false },
    { index: 3, name: 'catID', title: 'KATEGÓRIA', type: 'text', sortDir: '',footer:false },
    { index: 4, name: 'description', title: 'LEÍRÁS', type: 'text', sortDir: '',footer:false },
    { index: 5, name: 'price', title: 'ÁR (FT)', type: 'text', sortDir: '' ,footer:false},
    { index: 6, name: 'featured', title: 'KIEMELT', type: 'text', sortDir: '',footer:false },
    { index: 7, name: 'active', title: 'ELÉRHETŐ', type: 'text', sortDir: '',footer:false },
  ]
}