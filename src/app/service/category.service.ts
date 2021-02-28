import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from 'app/model/category';
import { BaseService } from './base.service';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends BaseService<Category> {
  constructor(httpClient: HttpClient, config:ConfigService) {
    super(config, httpClient, "categories");
  }
}
