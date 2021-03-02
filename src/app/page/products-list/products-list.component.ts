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
  cat: string = '';
  description: string = '';
  price: number = 0;
  featured: boolean = false;
  active: boolean = false;

  constructor() { }
}



@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})

export class ProductsListComponent implements OnInit {

  //products: Product[];
  products: ProductView[] = [];
  loading: boolean;

  phraseString: string = '';

  direction: number = 1;
  columnKey: string = '';

  length: number;

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

    let categories:Category[];
    this.categotyService.getAll().subscribe(cats=>{
      categories = cats;
    });

    setTimeout(() => {
      this.productsService.getAll().subscribe(items => {
        items.forEach(item=>{
          let prd : ProductView = new ProductView();
          prd.id = item.id;
          prd.type = item.type;
          prd.name = item.name;
          prd.cat = categories.find(y=>y.id == item.catID).name;
          this.products.push(prd);
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

  getLength(): void {
    this.length = this.products.length;
  }

}