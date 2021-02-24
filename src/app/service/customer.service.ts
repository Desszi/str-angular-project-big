import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from 'app/model/customer';
import { BehaviorSubject, of } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  apiUrl: string = 'http://localhost:3000/customers';
  clist$: BehaviorSubject<Customer[]> = new BehaviorSubject<Customer[]>([]);

  constructor(
    private http: HttpClient
  ) { }


  getById(id: number): Observable<Customer | undefined> {
    return of(this.clist$.value.find(item => id == item.id));
  }

  getAll(): void {
    this.http.get<Customer[]>(this.apiUrl).subscribe(
      items => this.clist$.next(items)
    );
  }

  update(item: Customer): void {
    this.http.put<Customer>(`${this.apiUrl}/${item.id}`, item).subscribe(i => {
      this.getAll();
    });
  }

  remove(id: number): void {
    this.http.delete<Customer>(`${this.apiUrl}/${id}`).subscribe(i => {
      this.getAll();
    });
  }
}
