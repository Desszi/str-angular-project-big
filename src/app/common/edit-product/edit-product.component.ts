import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../service/products.service';
import { Product } from 'app/model/product';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  product: Product = new Product();

  constructor(
    private productsService: ProductsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,

  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      params =>
        this.productsService.get(params.id).subscribe(
          item => {
            this.product = item || new Product();
          }
        )
    )
  }

  onUpdate(form: NgForm, item: Product): void {

    try {
      if (item.id == 0) {
        this.productsService.create(item).subscribe(
          () => { }
        );
        this.toastr.success('Sikeresn hozzáadásra került');
        this.router.navigate(['/product-list']);
      }
      else {
        this.productsService.update(item).subscribe(
          () => { }
        );
        this.toastr.success('Sikeres módosítás :)');
        this.router.navigate(['/product-list']);
      }
    } catch (error) {
      this.toastr.success('Probléma történt:' + error);
    }
  }

}
