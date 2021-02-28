import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Address } from 'app/model/address';
import { AddressesService } from 'app/service/addresses.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.component.html',
  styleUrls: ['./edit-address.component.css']
})
export class EditAddressComponent implements OnInit {

  address: Address = new Address();

  constructor(
    private addressesService: AddressesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      params =>
        this.addressesService.get(params.id).subscribe(
          item => {
            this.address = item || new Address();
          }
        )
    )
  }

  onUpdate(form: NgForm, item: Address): void {

    try {
      if (item.id == 0) {
        this.addressesService.create(item).subscribe(
          () => { }
        );
        this.toastr.warning('Sikeresn hozzáadásra került');
        this.router.navigate(['/address-list']);
      }
      else {
        this.addressesService.update(item).subscribe(
          () => { }
        );
        this.toastr.success('Sikeres módosítás :)');
        this.router.navigate(['/address-list']);
      }
    } catch (error) {
      this.toastr.error('Probléma történt:' + error);
    }
  }

}
