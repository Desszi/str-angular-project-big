import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'app/model/product';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs-compat/operator/switchMap';
import { ProductsService} from '../../service/products.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  product:Product = new Product();

  constructor(
    private productsService:ProductsService, 
    private activatedRoute:ActivatedRoute,
    private router: Router,

  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      params=> 
          this.productsService.getById(params.id).subscribe(
          item =>{
            console.log(item);
            this.product = item || new Product();
          }
        )
     )
    }


    onUpdate(form: NgForm, item: Product): void {
      if(item.id == 0){
        this.productsService.update(item);
        this.router.navigate(['/table-list']);
      }
      else{
        this.productsService.update(item)
        this.router.navigate(['/table-list']);    
      }
    }

}
