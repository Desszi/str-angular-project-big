import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../service/products.service';
import { Product } from 'app/model/product';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  product: Product = new Product();
  updating: boolean = false;

  constructor(
    private productsService: ProductsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,

  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      params =>
        this.productsService.getById(params.id).subscribe(
          item => {
            this.product = item || new Product();
          }
        )
    )
  }

  onUpdate(form: NgForm, product: Product): void {
    this.updating = true;
    if (product.id == 0) {
      this.productsService.create(product);
      this.router.navigate(['/product-list']);
    }
    else {
      this.productsService.update(product).subscribe(
        () => this.router.navigate(['/product-list'])
      );
    }
  }

}
