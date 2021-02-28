import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'app/model/product';
import { Radio } from 'app/model/radio';
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

  @Input() phraseString: string = '';
  direction: number = 1;
  columnKey: string = '';
  icon: string = '';
  caret: string = 'fa fa-caret-down/up';

  radioItems: Radio[] = [
    { name: '#', value: 'id' },
    { name: 'NÉV', value: 'name' },
    { name: 'TÍPUS', value: 'type' },
    { name: 'KATEGÓRIA', value: 'catID' },
    { name: 'LEÍRÁS', value: 'description' },
    { name: 'ÁR', value: 'price' },
    { name: 'KIEMELT', value: 'featured' },
    { name: 'ELÉRHETŐ', value: 'active' },
  ];

  radioSel: any;
  radioSelected: string;
  radioSelectedString: string;

  constructor(
    private productsService: ProductsService,
    private config: ConfigService
  ) {
    this.radioItems;
    this.radioSelected = 'name';
    this.getSelecteditem();
  }

  ngOnInit(): void {
    this.update();
  }

  getSelecteditem() {
    this.radioSel = this.radioItems.find(Item => Item.value === this.radioSelected);
    this.radioSelectedString = this.radioSel.value;
  }

  onItemChange(item) {
    this.getSelecteditem();
  }

  onDelete(item: Product) {
    this.productsService.remove(item).subscribe(i => {
      this.update();
    });
  }

  update(): void {
    this.loading = true;
      this.productsService.getAll().pipe(
        finalize(() =>{ this.loading = false;})
      ).subscribe(()=>{});

    setTimeout(()=>{  
    this.productsService.getAll().subscribe(items =>{
        this.products = items;
      })
    },this.config.updateDelayTimeMs);
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