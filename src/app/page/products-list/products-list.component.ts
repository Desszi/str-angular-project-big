import { Component, OnInit } from '@angular/core';
import { Product } from 'app/model/product';
import { ConfigService } from 'app/service/config.service';
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

  phraseString: string = '';

  direction: number = 1;
  columnKey: string = '';

  length: number;

  constructor(
    private productsService: ProductsService,
    private config: ConfigService
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
      finalize(() => { this.loading = false; })
    ).subscribe(() => { });

    setTimeout(() => {
      this.productsService.getAll().subscribe(items => {
        this.products = items;
      })
    }, this.config.updateDelayTimeMs);
  }

  onColumnSelect(key: string): void {
    if (this.columnKey === key) {
      this.direction = this.direction * -1;
    } else {
      this.direction = 1;
    }
    this.columnKey = key;
  }

  onSearchPhrase(event: Event): void {
    this.phraseString = (event.target as HTMLInputElement).value;
  }

  getLength(): void {
    this.length = this.products.length;
  }

}