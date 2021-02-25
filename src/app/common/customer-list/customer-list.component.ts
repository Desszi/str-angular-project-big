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
    this.customerService.getAll().pipe(
      finalize(() => this.loading = false)
    ).subscribe(items => this.customers = items)
  }

}

 /*  customer$: BehaviorSubject<Customer[]> = this.customerService.clist$  ;

  constructor(
    private customerService:CustomerService, 
    private activatedRoute:ActivatedRoute,
    private router: Router,

  ) { }

  ngOnInit(): void {

    this.customerService.getAll();
   */


   /* this.activatedRoute.params.subscribe(
      params=> 
          this.customerService.getById(params.id).subscribe(
          item =>{
            console.log(item);
            this.customer = item || new Customer();
          }
        )
     )
    }*/


   /* onUpdate(form: NgForm, item: Customer): void {
      if(item.id == 0){
        this.customerService.update(item);
        this.router.navigate(['/customer-list']);
      }
      else{
        this.customerService.update(item)
        this.router.navigate(['/customer-list']);    
      }
  }*/

