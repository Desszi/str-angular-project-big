import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Category } from 'app/model/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  apiUrl: string = 'http://localhost:3000/categories';
  list$: BehaviorSubject<Category[]> = new BehaviorSubject<Category[]>([]);

  constructor(
    private http: HttpClient
  ) { }


  getById(id: number): Observable<Category | undefined> {
    return of(this.list$.value.find(item => id == item.id));
  }

  getAll(): void {
    this.http.get<Category[]>(this.apiUrl).subscribe(
      items => this.list$.next(items)
    );
  }

  update(item: Category): void {
    this.http.put<Category>(`${this.apiUrl}/${item.id}`, item).subscribe(i => {
      this.getAll();
    });
  }

  remove(id: number): void {
    this.http.delete<Category>(`${this.apiUrl}/${id}`).subscribe(i => {
      this.getAll();
    });
  }
}
