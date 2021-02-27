import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'app/model/product';
import { ProductsService } from 'app/service/products.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  products: Product[];
  loading: boolean;

  @Input() phraseString: string = '';
  direction: number = 1;
  columnKey: string = '';

  constructor(
    private productsService: ProductsService
  ) { }

  ngOnInit(): void {
    this.update();
  }

  onDelete(item: Product) {
    this.productsService.remove(item).subscribe(i => {
      this.update();
    });
  }

  update(): void {
    this.loading = true;
    this.productsService.getAll().pipe(
      finalize(() => this.loading = false)
    ).subscribe(items => this.products = items)
  }

  onColumnSelect(key: string): void {
    if (this.columnKey === key) {
      this.direction = this.direction * -1;
    } else {
      this.direction = 1;
    }
    this.columnKey = key;
  }

}