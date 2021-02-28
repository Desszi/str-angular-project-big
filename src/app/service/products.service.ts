import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from 'app/model/product';
import { ConfigService } from './config.service';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService extends BaseService<Product> {
  constructor(httpClient: HttpClient, config: ConfigService) {
    super(config, httpClient, "products");
  }
}