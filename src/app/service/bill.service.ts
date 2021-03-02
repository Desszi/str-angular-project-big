import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";
import { Bill } from "app/model/bill";
import { ConfigService } from "./config.service";
import { BaseService } from "./base.service";
import { Column } from "app/model/column";
@Injectable({
  providedIn: "root",
})
export class BillService extends BaseService<Bill> {
  constructor(private httpClient: HttpClient, config: ConfigService) {
    super(config, httpClient, "bills");
  }

  columns: Column[] = [
    { index: 0, name: "id", title: "#", type: "text", sortDir: "" },
    {
      index: 1,
      name: "orderID",
      title: "RENDELÉSI AZONOSÍTÓ",
      type: "text",
      sortDir: "",
    },
    { index: 2, name: "amount", title: "ÖSSZEG", type: "text", sortDir: "" },
    {
      index: 3,
      name: "status",
      title: "RENDELÉS ÁLLAPOTA",
      type: "text",
      sortDir: "",
    },
  ];
}
