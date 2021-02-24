import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Product } from 'app/model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  apiUrl: string = 'http://localhost:3000/products';
  list$: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);

  constructor(
    private http: HttpClient
  ) { }


  getById(id: number): Observable<Product | undefined> {
    return of(this.list$.value.find(item => id == item.id));
  }

  getAll(): void {
    this.http.get<Product[]>(this.apiUrl).subscribe(
      items => this.list$.next(items)
    );
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


