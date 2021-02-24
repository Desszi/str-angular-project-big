import { Component, OnInit } from '@angular/core';
import { Product } from 'app/model/product';
import { ProductsService } from 'app/service/products.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  products: BehaviorSubject<Product[]> = this.productsService.list$;

  constructor(
    private productsService: ProductsService
  ) { }

  ngOnInit(): void {

    this.productsService.getAll();
    this.products.subscribe(item => console.log(item));
  }

}
