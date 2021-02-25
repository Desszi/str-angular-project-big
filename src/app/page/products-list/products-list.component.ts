import { Component, OnInit } from '@angular/core';
import { Product } from 'app/model/product';
import { ProductsService } from 'app/service/products.service';
import { BehaviorSubject } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  products: Product[];
  loading: boolean;

  constructor(
    private productsService: ProductsService
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.productsService.getAll().pipe(
      finalize(
        () => this.loading = false)).subscribe(
          items => this.products = items)
  }

  onDelete(product: Product) {
    this.productsService.remove(product);
  }

}
