import { ToastService } from '@app/_services';
import { environment } from '@environments/environment';
import { ProductInfo } from './add-product-modal/models/productInfo.model';
import { ProductService } from './../_services/product.service';
import { AddProductModalComponent } from './add-product-modal/add-product-modal.component';
import { DialogService } from './../shared/widgets/dialog/dialog.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  public products = [
    {
      name: 'Maize Farm',
      img: '/assets/img/maize-plantation.jpg',
      price: '132000',
      number: 1
    },
    {
      name: 'Wheat Farm',
      img: '/assets/img/wheat2.jpeg',
      price: '145000',
      number: 1
    }
  ];

  public realProducts = [];

  public cartItems = [];

  public totalPrice = 0;

  public isProcessing = false;

  constructor(private dialogService: DialogService,
              private productService: ProductService,
              private toastService: ToastService) { }

  ngOnInit(): void {
    this.productService.getAll().subscribe((result) => {
      this.realProducts = result;
      this.realProducts.forEach((product: ProductInfo) => {
        product.productPhoto = `${environment.apiUrl}/products/image?img=${product.productPhoto}&id=${product.id}`;
      });
      console.log(this.realProducts);
    });
  }

  addToCart(event: any) {
    if (!this.cartItems.includes(event)) {
      this.cartItems.push(event);
    }
    this.calculateTotal();
  }

  addProduct() {
    this.dialogService.showComponent(AddProductModalComponent, '', 'large');
  }

  removeItem(item) {
    this.cartItems = this.cartItems.filter((x) => x !== item );
    this.calculateTotal();
  }

  calculateTotal() {
    this.totalPrice = this.cartItems.reduce((sum, current) => sum + parseInt(current.price, 10), 0);
  }

  delete(id: string) {
    this.isProcessing = true;
    this.realProducts = this.realProducts.filter((product) => product.id !== id);
    this.productService.delete(id).subscribe(() => {
      this.isProcessing = false;
      this.toastService.showSuccess('Your Product was deleted successfully', 'Delete Success');
    }, (err) => {
      this.isProcessing = false;
      this.toastService.showError('Something went wrong', 'Delete Failed');
    });
  }

}
