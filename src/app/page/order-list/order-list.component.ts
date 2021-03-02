import { Component, OnInit } from '@angular/core';
import { Order } from 'app/model/order';
import { OrdersService } from '../../service/orders.service';
import { BehaviorSubject } from 'rxjs';
import { Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { ConfigService } from 'app/service/config.service';


@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  ngOnInit(): void {
   
  }
}
