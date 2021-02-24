import { Component, OnInit } from "@angular/core";
import { Bill } from "app/model/bill";
import { BillService } from "app/service/bill.service";
import { BehaviorSubject } from "rxjs";

@Component({
  selector: "app-bill-list",
  templateUrl: "./bill-list.component.html",
  styleUrls: ["./bill-list.component.css"],
})
export class BillListComponent implements OnInit {
  bills: BehaviorSubject<Bill[]> = this.billService.billList$;

  constructor(private billService: BillService) {}

  ngOnInit(): void {
    this.billService.getAll();
  }
}
