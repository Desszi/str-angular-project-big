import { Component, OnInit } from '@angular/core';
import { Address } from 'app/model/address';
import { BehaviorSubject } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AddressesService } from '../../service/addresses.service';

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.css']
})
export class AddressListComponent implements OnInit {

  addresses: Address[] = null;
  loading: boolean = true;

  constructor(
    private addressesService: AddressesService
  ) { }

  ngOnInit(): void {
    this.update();
  }

  onDelete(item: Address) {
    this.addressesService.remove(item).subscribe(i => {
      this.update();
    });
  }

  update(): void { 
    this.loading = true;
    setTimeout(()=>{
      this.addressesService.getAll().pipe(
        finalize(() => this.loading = false)
      ).subscribe(items => this.addresses = items)
    },200);
  }
}
