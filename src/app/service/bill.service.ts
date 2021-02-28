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
  constructor(private httpClient: HttpClient, config:ConfigService) {
    super(config, httpClient, "bills");
  }
}
