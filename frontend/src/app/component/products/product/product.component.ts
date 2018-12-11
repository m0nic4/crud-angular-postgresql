import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
// SERVICE
import { ProductService } from '../../../services/product.service';
// CLASS
import { Product } from '../../../models/product';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
 // productService: ProductService;
  constructor( public productService: ProductService) {}

  ngOnInit() {}
  getProducts() {
    this.productService.getProducts();
  }

  addProduct(productForm?: NgForm) {
    if (productForm.value.id_product === 0) {
      this.productService.insertProduct(productForm.value).subscribe(res => {
        console.log(res);
        this.resetForm(productForm);
        this.getProducts();
      });
    } else {
      this.productService.updateProduct(productForm.value).subscribe(res => {
        console.log(res);
        this.resetForm(productForm);
        this.getProducts();
      });
    }
  }

  editProduct(product: Product) {
    this.productService.selectedProduct = product;
  }

  deleteProduct(id_product: number, productForm: NgForm) {
    if (confirm('Are you sure ?')) {
      this.productService.deleteProduct(id_product).subscribe(res => {
        this.getProducts();
        this.resetForm(productForm);
      });
    }
  }

  resetForm(productForm?: NgForm) {
    if (productForm != null) {
      productForm.reset();
      this.productService.selectedProduct = new Product();
    }
  }
}
