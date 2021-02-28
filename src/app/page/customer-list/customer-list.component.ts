import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'app/model/customer';
import { CustomerService } from 'app/service/customer.service';
import { BehaviorSubject } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  customers: Customer[];
  loading: boolean;

  constructor(
    private customerService: CustomerService
  ) { }

  ngOnInit(): void {
    this.update();
  }

  onDelete(item: Customer) {
    this.customerService.remove(item).subscribe(i => {
      this.update();
    });
  }

  update(): void {
    this.loading = true;
    setTimeout(()=>{
      this.customerService.getAll().pipe(
        finalize(() => this.loading = false)
      ).subscribe(items => this.customers = items)
    },200);
  }
}


