import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Bill } from "app/model/bill";
import { BillService } from "app/service/bill.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-edit-bill",
  templateUrl: "./edit-bill.component.html",
  styleUrls: ["./edit-bill.component.css"],
})
export class EditBillComponent implements OnInit {
  bill: Bill = new Bill();

  constructor(
    private billService: BillService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) =>
      this.billService.get(params.id).subscribe((item) => {
        this.bill = item || new Bill();
      })
    );
  }

  onUpdate(form: NgForm, item: Bill): void {
    try {
      if (item.id == 0) {
        this.billService.create(item).subscribe(() => {});
        this.toastr.warning("Sikeresn hozzáadásra került");
        this.router.navigate(["/bill-list"]);
      } else {
        this.billService.update(item).subscribe(() => {});
        this.toastr.success("Sikeres módosítás :)");
        this.router.navigate(["/bill-list"]);
      }
    } catch (error) {
      this.toastr.error("Probléma történt:" + error);
    }
  }
}
