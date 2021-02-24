import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";
import { Bill } from "app/model/bill";

@Injectable({
  providedIn: "root",
})
export class BillService {
  apiUrl: string = "http://localhost:3000/bills";
  billList$: BehaviorSubject<Bill[]> = new BehaviorSubject<Bill[]>([]);

  constructor(private http: HttpClient) {}
  getAll(): void {
    this.http
      .get<Bill[]>(this.apiUrl)
      .subscribe((bill) => this.billList$.next(bill));
  }
}
