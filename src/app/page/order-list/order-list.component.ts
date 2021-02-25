import { Component, OnInit } from '@angular/core';
import { Order } from 'app/model/order';
import { OrdersService } from '../../service/orders.service';
import { BehaviorSubject } from 'rxjs';
import { finalize } from 'rxjs/operators';


@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  orders: Order[] = null;
  loading: boolean = true;


  constructor(
    private ordersService: OrdersService
  ) { }

  ngOnInit(): void {

    this.update();

  }
  onDelete(item: Order) {
    this.ordersService.remove(item).subscribe(i => {
      this.update();
    });
  }

  update(): void {
    this.loading = true;
    this.ordersService.getAll().pipe(
      finalize(() => this.loading = false)
    ).subscribe(items => this.orders = items)
  }

}
