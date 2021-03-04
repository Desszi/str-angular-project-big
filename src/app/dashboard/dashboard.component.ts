import { Component, OnInit } from '@angular/core';
import { BillService } from 'app/service/bill.service';
import { CustomerService } from 'app/service/customer.service';
import { OrdersService } from 'app/service/orders.service';
import { ProductsService } from 'app/service/products.service';
import { finalize } from 'rxjs/operators';
import * as Chartist from 'chartist';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  //Felső kártyákhoz használt adatok
  activeProductsCount: number = 0; //Aktív termékek száma
  activeCustomerCount: number = 0; //Aktív vásárlók száma
  activeBillsCount: number = 0 // Jelenlegi számlák száma
  newBillsSum: number = 0; //Számlák összege

  //Különböző rendelések státuszának kimutatásához használt adatok
  productsStatusChart: any;

  newOrdersCount: number = 0; //Új megrendelések
  paidOrdersCount: number = 0; //Fizetett rendelések száma
  shippedOrdersCount: number = 0; //Kiszállított rendelés

  loading: boolean; //Betöltésért felel.

  productsSumChart: any;

  //Bekötjük a többi oldalról szedett listál adatbázisát, Service osztályait.
  constructor(
    private productsService: ProductsService,
    private customersService: CustomerService,
    private ordersService: OrdersService,
    private billsService: BillService
  ) { }

  //A vonal diagram megrajzolásához és animálásához használt függvény.
  startAnimationForLineChart(chart) {
    let seq: any, delays: any, durations: any;
    seq = 0;
    delays = 80;
    durations = 500;

    chart.on('draw', function (data) {
      if (data.type === 'line' || data.type === 'area') {
        data.element.animate({
          d: {
            begin: 600,
            dur: 700,
            from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint
          }
        });
      } else if (data.type === 'point') {
        seq++;
        data.element.animate({
          opacity: {
            begin: seq * delays,
            dur: durations,
            from: 0,
            to: 1,
            easing: 'ease'
          }
        });
      }
    });

    seq = 0;
  };

  //Az oszlopdiagram megrajzolásához és animálásához használt függvény.
  startAnimationForBarChart(chart) {
    let seq2: any, delays2: any, durations2: any;

    seq2 = 0;
    delays2 = 80;
    durations2 = 500;
    chart.on('draw', function (data) {
      if (data.type === 'bar') {
        seq2++;
        data.element.animate({
          opacity: {
            begin: seq2 * delays2,
            dur: durations2,
            from: 0,
            to: 1,
            easing: 'ease'
          }
        });
      }
    });

    seq2 = 0;
  };

  ngOnInit() {


    this.loading = true;
    //Aktív státuszú termékek kiszűrése, számuk meghatározása.
    this.productsService.getAll()
      .pipe(finalize(() => this.loading = false)
      ).subscribe(products => {
        this.activeProductsCount = products.filter(p => p.active).length;
      })

    this.loading = true;
    //A rendszerben lévő számlák száma.
    this.billsService.getAll()
      .pipe(finalize(() => this.loading = false)
      ).subscribe(bills => {
        this.activeBillsCount = bills.length;
      })

    this.loading = true;
    //Aktív státuszú vásárlók kiszűrése és számuk meghatározása.
    this.customersService.getAll()
      .pipe(finalize(() => this.loading = false)
      ).subscribe(customers => {
        this.activeCustomerCount = customers.filter(c => c.active).length;
      })


    this.loading = true;
    //Különböző státuszú rendelések száma
    this.ordersService.getAll()
      .pipe(finalize(() => this.loading = false)
      ).subscribe(orders => {
        this.newOrdersCount = orders.filter(n_o => n_o.status == "new").length;
        this.paidOrdersCount = orders.filter(p_o => p_o.status == "paid").length;
        this.shippedOrdersCount = orders.filter(s_o => s_o.status == "shipped").length;

        //Összesítés
        let newOrdersSum = 0;
        let paidOrdersSum = 0;
        let shippedOrdersSum = 0;

        orders.filter(n_o => n_o.status == "new").forEach(item => newOrdersSum += item.amount);
        orders.filter(p_o => p_o.status == "paid").forEach(item => paidOrdersSum += item.amount);
        orders.filter(s_o => s_o.status == "shipped").forEach(item => shippedOrdersSum += item.amount);

        this.loading = true;
        this.billsService.getAll()
          .pipe(finalize(() => this.loading = false)
          ).subscribe(bills => {
            this.newBillsSum = 0;
            bills.filter(b => b.status == "new")
              .forEach(item => this.newBillsSum += item.amount);
          })


        //Oszlopdiagram ahol a rendelések száma kimutatható.
        var datawebsiteViewsChart = {
          labels: ['Új rendelés', 'Fizetett rendelés', 'Kiszállított rendelés'],
          series: [
            [this.newOrdersCount, this.paidOrdersCount, this.shippedOrdersCount]
          ]
        };
        var optionswebsiteViewsChart = {
          axisX: {
            showGrid: false
          },
          low: 0,
          high: 60,
          chartPadding: { top: 0, right: 0, bottom: 0, left: 0 }
        };
        var responsiveOptions: any[] = [
          ['screen and (max-width: 640px)', {
            seriesBarDistance: 3,
            axisX: {
              labelInterpolationFnc: function (value) {
                return value[0];
              }
            }
          }]
        ];
        var websiteViewsChart = new Chartist.Bar('#websiteViewsChart', datawebsiteViewsChart, optionswebsiteViewsChart, responsiveOptions);
        this.startAnimationForBarChart(websiteViewsChart);

        // Vonaldiagram, ahol az általános adatok látszódnak.
        const dataDailySalesChart: any = {
          labels: ['Termékek', 'Vásárlók', 'Számlák'],
          series: [
            [this.activeProductsCount, this.activeCustomerCount, this.activeBillsCount]
          ]
        };

        const optionsDailySalesChart: any = {
          lineSmooth: Chartist.Interpolation.cardinal({
            tension: 0
          }),
          low: 0,
          high: 120, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: { top: 0, right: 0, bottom: 0, left: 0 },
        }

        var dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);
        this.startAnimationForLineChart(dailySalesChart);


      })

  }
}