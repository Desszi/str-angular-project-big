import { Component, OnInit } from '@angular/core';
import { BillService } from 'app/service/bill.service';
import { CustomerService } from 'app/service/customer.service';
import { OrdersService } from 'app/service/orders.service';
import { ProductsService } from 'app/service/products.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  activeProductsCount: number = 0;
  activeCustomerCount: number = 0;
  newOrdersCount: number = 0;
  paidOrdersCount: number = 0;
  shippedOrdersCount: number = 0;
  newBillsSum: number = 0;
  loading: boolean;

  productsStatusChart: any;
  productsSumChart:any;

  constructor(
    private productsService: ProductsService,
    private customersService: CustomerService,
    private ordersService: OrdersService,
    private billsService: BillService
  ) { }

  ngOnInit() {
    this.loading = true;
    this.productsService.getAll().pipe(
      finalize(() => this.loading = false)
    ).subscribe(items => {
      this.activeProductsCount = items.filter(i => i.active).length;
    })

    this.loading = true;
    this.customersService.getAll().pipe(
      finalize(() => this.loading = false)
    ).subscribe(items => {
      this.activeCustomerCount = items.filter(i => i.active).length;
    })

    this.loading = true;
    this.ordersService.getAll().pipe(
      finalize(() => this.loading = false)
    ).subscribe(items => {
      this.newOrdersCount = items.filter(i => i.status == "new").length;
      this.paidOrdersCount = items.filter(i => i.status == "paid").length;
      this.shippedOrdersCount = items.filter(i => i.status == "shipped").length;

      this.productsStatusChart = {
        labels: ['Új', 'Fizetve', 'Leszállítva',],
        series: [[this.newOrdersCount, this.paidOrdersCount, this.shippedOrdersCount]]
      };

      let newOrdersSum = 0;
      items.filter(i => i.status == "new").forEach(item => newOrdersSum += item.amount);
      let paidOrdersSum = 0;
      items.filter(i => i.status == "new").forEach(item => paidOrdersSum += item.amount);
      let shippedOrdersSum = 0;
      items.filter(i => i.status == "new").forEach(item => shippedOrdersSum += item.amount);


      this.productsSumChart = {
        labels: ['Új', 'Fizetve', 'Leszállítva',],
        series: [[newOrdersSum, paidOrdersSum, shippedOrdersSum]]
      };

    })


    this.loading = true;
    this.billsService.getAll().pipe(
      finalize(() => this.loading = false)
    ).subscribe(items => {
      this.newBillsSum = 0;
      items.filter(i => i.status == "new").forEach(item => this.newBillsSum += item.amount);
    })
  }

}
