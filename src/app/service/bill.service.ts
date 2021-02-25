import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";
import { Bill } from "app/model/bill";
import { ConfigService } from "./config.service";
import { BaseService } from "./base.service";
@Injectable({
  providedIn: "root",
})
export class BillService extends BaseService<Bill> {
  constructor(private httpClient: HttpClient) {
    super(new ConfigService("http://localhost:3000"), httpClient, "bills");
  }
}

/* export class BillService {
  apiUrl: string = "http://localhost:3000/bills";
  billList$: BehaviorSubject<Bill[]> = new BehaviorSubject<Bill[]>([]);

  constructor(private http: HttpClient) {}
  getAll(): void {
    this.http
      .get<Bill[]>(this.apiUrl)
      .subscribe((bill) => this.billList$.next(bill));
  }
} */
