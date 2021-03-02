import { Component, OnInit } from '@angular/core';
import { Category } from 'app/model/category';
import { Product } from 'app/model/product';
import { CategoryService } from 'app/service/category.service';
import { ConfigService } from 'app/service/config.service';
import { ProductsService } from 'app/service/products.service';
import { finalize } from 'rxjs/operators';

export class ProductView {
  id: number = 0;
  name: string = '';
  type: string = '';
  catID: string = '';
  description: string = '';
  price: number = 0;
  featured: boolean | string = false;
  active: boolean | string = false;

  constructor() { }
}

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})

export class ProductsListComponent implements OnInit {

  products: ProductView[] = [];
  loading: boolean;

  phraseString: string = '';

  direction: number = 1;
  columnKey: string = '';

  constructor(
    private productsService: ProductsService,
    private categotyService: CategoryService,
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

    let categories: Category[];
    this.categotyService.getAll().subscribe(cats => {
      categories = cats;
    });

    const x = setTimeout(() => {
      clearTimeout(x);
      this.productsService.getAll().subscribe(items => {
        items.forEach(item => {
          const product: ProductView = new ProductView();
          product.id = item.id;
          product.type = item.type;
          product.name = item.name;
          product.catID = categories.find(elem => elem.id == item.catID).name;
          product.description = item.description;
          product.price = item.price;
          product.featured = item.featured;
          (product.featured == true) ? product.featured = 'Igen' : product.featured = 'Nem';
          product.active = item.active;
          (product.active == true) ? product.active = 'Igen' : product.active = 'Nem';
          this.products.push(product);
        })
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

}