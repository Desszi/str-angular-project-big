import { Component, OnInit } from '@angular/core';
import { Product } from 'app/model/product';
import { ProductsService } from 'app/service/products.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {

  products: BehaviorSubject<Product[]> = this.productsService.list$;

  constructor(
    private productsService: ProductsService
  ) { }

  ngOnInit(): void {
    this.productsService.getAll();
  }

  onDelete(item: Product) {
    this.productsService.remove(item);
  }

}
