import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Product } from 'app/model/product';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  apiUrl: string = 'http://localhost:3000/products';


  constructor(
    private http: HttpClient
  ) { }


  getById(id: number): Observable<Product | undefined> {
    let retval: Product = null;
    this.getAll().subscribe(items => {
      retval = items.find(item => id == item.id);
    })
    return of(retval);
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


