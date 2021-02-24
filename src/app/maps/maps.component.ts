import { Component, OnInit } from '@angular/core';
import { Order } from 'app/model/order';
import { OrdersService } from 'app/service/orders.service';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'app-maps',
    templateUrl: './maps.component.html',
    styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {

    orders: BehaviorSubject<Order[]> = this.ordersService.orderList$;


    constructor(
        private ordersService: OrdersService

    ) { }

    ngOnInit(): void {

        this.ordersService.getAll();
        this.orders.subscribe(item => console.log(item));
    }
}
