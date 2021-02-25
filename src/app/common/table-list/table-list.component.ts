import { Component, OnInit } from '@angular/core';
import { Product } from 'app/model/product';
import { ProductsService } from 'app/service/products.service';
import { BehaviorSubject } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {

  products: Product[];
  loading:boolean;
  constructor(
    private productsService: ProductsService
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.productsService.getAll().pipe(
      finalize(() => this.loading = false)
    ).subscribe(items => this.products = items)
  }

  onDelete(item:Product){
    this.productsService.remove(item.id);
  }

}
