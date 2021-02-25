import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Product } from 'app/model/product';
import { delay, map } from 'rxjs/operators';
import { ConfigService } from './config.service';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
}) 
export class ProductsService extends BaseService<Product> {
    constructor(private httpClient: HttpClient) {
      super(new ConfigService('http://localhost:3000'), httpClient, "products");
    }
  }
  /*
export class ProductsService {

  apiUrl: string = 'http://localhost:3000/products';

  constructor(
    private http: HttpClient
  ) { }
  getById(id: number): Observable<Product | undefined > {
  //https://angular.io/guide/rx-library
   return this.getAll().pipe(map(items => {
       return items.find(item => id == item.id)}));
  }

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl).pipe(delay(500));
  }

  update(item: Product): void {
    this.http.put<Product>(`${this.apiUrl}/${item.id}`, item).subscribe(i => {
      this.getAll();
    });
  }

  remove(id: number): void {
    this.http.delete<Product>(`${this.apiUrl}/${id}`).subscribe(i => {
      this.getAll();
    });
  }
}
*/


