import { Component, OnInit } from '@angular/core';
import { Order } from 'app/model/order';
import { OrdersService } from '../../service/orders.service';
import { BehaviorSubject } from 'rxjs';
import { Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { ConfigService } from 'app/service/config.service';
import { Column } from 'app/model/column';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

export class OrderView {
  id: number = 0;
  customerID: number = 0;
  productID: number = 0;
  amount: number = 0;
  status: string = '';

  constructor() { }
}



@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  orders: OrderView[] = null;
  loading: boolean = true;
  columns: Column[] = this.ordersService.columns;
  phraseString: string = '';
  lastSelectedColumn: string = '';
  sortDir: string = ''
  displayedColumns: Column[] = [];
  orderList = this.ordersService.getAll();

  constructor(
    private ordersService: OrdersService,
    private config: ConfigService

  ) { }

  ngOnInit(): void {
    this.update();
    this.displayedColumns = [];
    this.columns.forEach((colunm, index) => {
      colunm.index = index;
      this.displayedColumns.push(colunm);
    });
  }

  onColumnSelect(colName: string): void {

    if (this.lastSelectedColumn != colName)
      this.columns.forEach(i => i.sortDir = '');

    this.lastSelectedColumn = colName;

    const state = this.ordersService.columns.find(i => i.name == colName);
    if (state.sortDir == '')
      state.sortDir = 'up';
    if (state.sortDir == 'none')
      state.sortDir = 'up'
    else if (state.sortDir == 'up')
      state.sortDir = 'down';
    else if (state.sortDir == 'down')
      state.sortDir = 'up'

    this.sortDir = state.sortDir;
  }

  onDelete(item: Order) {
    this.ordersService.remove(item).subscribe(i => {
      this.update();
    });
  }

  update(): void {
    this.reset();
    this.loading = true;
    this.ordersService.getAll().pipe(
      finalize(() => { this.loading = false; })
    ).subscribe(() => { });

   const x = setTimeout(() => {
    clearTimeout(x);
     const orders: OrderView[] = [];
      this.ordersService.getAll().subscribe(items => {
        items.forEach(item => { 
          const order: OrderView = new OrderView();
          order.id = item.id;
          order.customerID = item.customerID;
          order.productID = item.productID;
          order.amount= item.amount;
          if(item.status=='paid')
            order.status = 'Fizetve';
          else if(item.status == 'new')
            order.status = 'Új';
          else if(item.status == 'shipped')
            order.status = 'Szállítás alatt';
            orders.push(order);
        })
        this.orders = orders;
      }) 

    }, this.config.updateDelayTimeMs);
  }

  onSearchPhrase(event: Event, colName: string): void {
    this.phraseString = (event.target as HTMLInputElement).value;
    this.lastSelectedColumn = colName;
  }

  reset(): void {
    this.orders = [];
    this.columns.forEach(i => i.sortDir = '');
    this.phraseString = '';
    this.lastSelectedColumn = '';
    this.sortDir = ''
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray<Column>(this.displayedColumns, event.previousIndex, event.currentIndex);
  }
}


