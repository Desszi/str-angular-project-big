import { Component, OnInit } from '@angular/core';
import { Address } from 'app/model/address';
import { BehaviorSubject } from 'rxjs';
import { AddressesService } from '../../service/addresses.service';

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.css']
})
export class AddressListComponent implements OnInit {

  addresses$: BehaviorSubject<Address[]> = this.addressesService.list$;

  constructor(
    private addressesService: AddressesService
  ) { }

  ngOnInit(): void {
    this.addressesService.getAll();
  }

  onDelete(item: Address) {
    this.addressesService.remove(item.id);
  }

}
