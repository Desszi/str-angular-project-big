import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Category } from 'app/model/category';
import { Column } from 'app/model/column';
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

  columns: Column[] = this.productsService.columns;
  lastSelectedColumn: string = '';
  sortDir: string = ''

  displayedColumns: Column[] = [];
  
  constructor(
    private productsService: ProductsService,
    private categotyService: CategoryService,
    private config: ConfigService
  ) { }

  ngOnInit(): void {
    this.update();
    this.displayedColumns = [];
    this.columns.forEach((colunm, index) => {
      colunm.index = index;
      this.displayedColumns.push(colunm);
    });
  }

  onDelete(item: Product) {
    this.productsService.remove(item).subscribe(i => {});
    this.update();
  }

  update(): void {
    this.reset();
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

  onColumnSelect(colName: string): void {

    if (this.lastSelectedColumn != colName)
      this.columns.forEach(col => col.sortDir = '');

    this.lastSelectedColumn = colName;

    const state = this.productsService.columns.find(col => col.name == colName);
    if (state.sortDir == '' || state.sortDir == 'none')
      state.sortDir = 'up';
    else if (state.sortDir == 'up')
      state.sortDir = 'down';
    else if (state.sortDir == 'down')
      state.sortDir = 'up'

    this.sortDir = state.sortDir;
  }

  onSearchPhrase(event: Event, colName: string): void {
    this.phraseString = (event.target as HTMLInputElement).value;
    this.lastSelectedColumn = colName;
  }

  reset():void{
    this.products = [];
    this.columns.forEach(i => i.sortDir = '');
    this.phraseString = '';
    this.lastSelectedColumn = '';
    this.sortDir = ''
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray<Column>(this.displayedColumns, event.previousIndex, event.currentIndex);
  }

}