import { Component, OnInit } from '@angular/core';
import { Product } from 'app/model/product';
import { ProductsService } from 'app/service/products.service';
import { BehaviorSubject } from 'rxjs';
import { finalize } from 'rxjs/internal/operators/finalize';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  
  product: Product[];
  loading = false;

  constructor(
    private productsService: ProductsService
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.productsService.getAll().pipe(
      finalize(() => this.loading = false)
    ).subscribe(items => this.product = items)
  }

}
