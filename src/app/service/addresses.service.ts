import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Address } from 'app/model/address';


@Injectable({
  providedIn: 'root'
})
export class AddressesService {
  apiUrl: string = 'http://localhost:3000/addresses';
  list$: BehaviorSubject<Address[]> = new BehaviorSubject<Address[]>([]);

  constructor(private http: HttpClient) { }

  getById(id: number): Observable<Address | undefined> {
    return of(this.list$.value.find(item => id == item.id));
  }

  getAll(): void {
    this.http.get<Address[]>(this.apiUrl).subscribe(
      items => this.list$.next(items)
    );
  }

  update(item: Address): void {
    this.http.put<Address>(`${this.apiUrl}/${item.id}`, item).subscribe(i => {
      this.getAll();
    });
  }

  remove(id: number): void {
    this.http.delete<Address>(`${this.apiUrl}/${id}`).subscribe(i => {
      this.getAll();
    });
  }
}

