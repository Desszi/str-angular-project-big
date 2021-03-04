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
  title: string = '';

  constructor(
    private customerService: CustomerService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,

  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      params =>{
        if(params.id == 0){
          this.customer = new Customer();
          this.title = 'Új elem felvétele';
        }
        else
          this.customerService.get(params.id).subscribe(
            item => {
              this.customer = item;
              this.title = 'Szerkesztés';
            })
      }
    )
  }
  
  onUpdate(form: NgForm, item: Customer): void {

    try {
      if (item.id == 0) {
        this.customerService.create(item).subscribe(() => {});
        this.toastr.warning('Sikeresen hozzáadásra került');
        this.router.navigate(['/customer-list']);
      }
      else {
        this.customerService.update(item).subscribe(() => {});
        this.toastr.success('Sikeres módosítás :)');
        this.router.navigate(['/customer-list']);
      }
    } catch (error) {
      this.toastr.error('Probléma történt:' + error);
    }
  }

}
