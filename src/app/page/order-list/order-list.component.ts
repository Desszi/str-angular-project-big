import { Component, OnInit } from '@angular/core';
import { Order } from 'app/model/order';
import { OrdersService } from '../../service/orders.service';
import { BehaviorSubject } from 'rxjs';


@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  orders: BehaviorSubject<Order[]> = this.ordersService.orderList$;


  constructor(
    private ordersService: OrdersService
  ) { }

  ngOnInit(): void {

    this.ordersService.getAll();

  }

}
