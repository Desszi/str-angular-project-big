import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Product } from 'app/model/product';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  apiUrl: string = 'http://localhost:3000/products';
  list$: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);

  constructor(
    private http: HttpClient
  ) { }


  getById(id: number): Observable<Product> {
    id = typeof id === 'string' ? parseInt(id, 10) : id;
    const ev: Product = this.list$.value.find(
      item => item.id === id);
    if (ev) {
      return of(ev);
    }
    return of(new Product());
  }

  getAll(): void {
    this.http.get<Product[]>(this.apiUrl).subscribe(
      items => this.list$.next(items)
    );
  }

  create(product: Product): void {
    this.http.post<Product>(this.apiUrl, product).subscribe(
      () => this.getAll()
    );
  }

  update(product: Product): Observable<Product> {
    return this.http.patch<Product>(`${this.apiUrl}/${product.id}`, product).pipe(
      tap(() => this.getAll())
    );
  }

  remove(product: Product): void {
    this.http.delete<Product>(`${this.apiUrl}/${product.id}`).subscribe(
      () => this.getAll()
    );
  }

}


