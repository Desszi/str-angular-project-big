import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'app/model/customer';
import { CustomerService } from 'app/service/customer.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit {

  customer: Customer = new Customer();

  constructor(
    private customerService: CustomerService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,

  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      params =>
        this.customerService.get(params.id).subscribe(
          item => {
            this.customer = item || new Customer();
          }
        )
    )
  }

  onUpdate(form: NgForm, item: Customer): void {

    try {
      if (item.id == 0) {
        this.customerService.create(item).subscribe(
          () => { }
        );
        this.toastr.success('Sikeresn hozzáadásra került');
        this.router.navigate(['/customer-list']);
      }
      else {
        this.customerService.update(item).subscribe(
          () => { }
        );
        this.toastr.success('Sikeres módosítás :)');
        this.router.navigate(['/customer-list']);
      }
    } catch (error) {
      this.toastr.success('Probléma történt:' + error);
    }
  }

}
