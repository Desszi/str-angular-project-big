import { Component, OnInit } from '@angular/core';
import { Order } from 'app/model/order';
import { OrdersService } from '../../service/orders.service';
import { BehaviorSubject } from 'rxjs';
import { Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs/operators';


@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  orders: Order[] = null;
  loading: boolean = true;

  @Input() phraseString: string = '';
  direction: number = 1;
  columnKey: string = '';

  orderList = this.ordersService.getAll();

  constructor(
    private ordersService: OrdersService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      console.log(params.phrase);
      this.phraseString = params.phrase;
    });

  }
   
  onColumnSelect(key: string): void {
    if (this.columnKey === key) {
      this.direction = this.direction * -1;
    } else {
      this.direction = 1;
    }
    this.columnKey = key;
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
