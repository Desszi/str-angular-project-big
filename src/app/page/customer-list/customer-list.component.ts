import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Address } from 'app/model/address';
import { Customer } from 'app/model/customer';
import { AddressesService } from 'app/service/addresses.service';
import { ConfigService } from 'app/service/config.service';
import { CustomerService } from 'app/service/customer.service';
import { BehaviorSubject } from 'rxjs';
import { finalize } from 'rxjs/operators';

export class CustomerView {
  id: number = 0;
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  fullAddress: number | string = 0;
  active: boolean | string = false;

  constructor() { }
}

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  customers: CustomerView[] = [];

  /* customers: Customer[]; */
  loading: boolean;

  constructor(
    private customerService: CustomerService,
    private addressesService: AddressesService,
    private config: ConfigService
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
    this.customerService.getAll().pipe(
      finalize(() => { this.loading = false; })
    ).subscribe(() => { });

    let addresses: Address[];
    this.addressesService.getAll().subscribe(adds => {
      addresses = adds;
    });

    const x = setTimeout(() => {
      clearTimeout(x);
      this.customerService.getAll().subscribe(items => {
        items.forEach(item => {
          const customer: CustomerView = new CustomerView();
          const addressClass = addresses.find(elem => elem.id == item.addressId);
          customer.id = item.id;
          customer.firstName = item.firstName;
          customer.lastName = item.lastName;
          customer.fullAddress = `${addressClass.country}, ${addressClass.city}, ${addressClass.street}`;
          console.log(customer.fullAddress);
          customer.email = item.email;
          customer.active = item.active;
          (customer.active == true) ? customer.active = 'Igen' : customer.active = 'Nem';
          this.customers.push(customer);
        })
      })
    }, this.config.updateDelayTimeMs);

    /* this.loading = true;
    this.customerService.getAll().pipe(
      finalize(() => { this.loading = false; })
    ).subscribe(() => { });

    setTimeout(() => {
      this.customerService.getAll().subscribe(items => {
        this.customers = items;
      })
    }, this.config.updateDelayTimeMs); */
  }
}


