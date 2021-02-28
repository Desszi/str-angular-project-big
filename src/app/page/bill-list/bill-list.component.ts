import { Component, OnInit } from "@angular/core";
import { Bill } from "app/model/bill";
import { BillService } from "app/service/bill.service";
import { ConfigService } from "app/service/config.service";
import { finalize } from "rxjs/internal/operators/finalize";

@Component({
  selector: "app-bill-list",
  templateUrl: "./bill-list.component.html",
  styleUrls: ["./bill-list.component.css"],
})
export class BillListComponent implements OnInit {
  bills: Bill[];
  loading = false;
  constructor(
      private billService: BillService,
      private config:ConfigService
      ) {}

  ngOnInit(): void {
    this.update();
  }

  onDelete(item: Bill) {
    this.billService.remove(item).subscribe((i) => {
      this.update();
    });
  }

  update(): void {
    this.loading = true;
    setTimeout(()=>{
      this.billService
        .getAll()
        .pipe(finalize(() => (this.loading = false)))
        .subscribe((items) => (this.bills = items));
      },this.config.updateDelayTimeMs);
  }
}
