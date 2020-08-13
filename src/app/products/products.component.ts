import { UserInfo } from '@app/user-profile/models/userInfo.model';
import { PurchaseService } from './../_services/purchase.service';
import { ToastService, AuthenticationService } from '@app/_services';
import { environment } from '@environments/environment';
import { ProductInfo } from './add-product-modal/models/productInfo.model';
import { ProductService } from './../_services/product.service';
import { AddProductModalComponent } from './add-product-modal/add-product-modal.component';
import { DialogService } from './../shared/widgets/dialog/dialog.service';
import { Component, OnInit } from '@angular/core';
import { PurchaseInfo } from '@app/_models';
import { PaymentInstance } from 'angular-rave';

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

  public user = new UserInfo();
  public realProducts = [];
  public reference = '';
  public cartItems = [];
  public totalPrice = 0;
  public publicKey = 'pk_test_79fb2e9f63daac02bb06dc44dc62332a7ad639bd';
  public purchase = new PurchaseInfo();
  public isProcessing = false;

  constructor(private authService: AuthenticationService,
              private dialogService: DialogService,
              private productService: ProductService,
              private purchaseService: PurchaseService,
              private toastService: ToastService) { }

  ngOnInit(): void {
    window.scroll(0, 0);
    this.productService.getAll().subscribe((result) => {
      this.realProducts = result;
    });
    this.authService.currentUser.subscribe((result) => {
      this.user = result;
    });
    this.reference = `ref-${Math.ceil(Math.random() * 10e13)}`;
  }

  addToCart(event: any) {
    if (!this.cartItems.includes(event)) {
      this.cartItems.push(event);
    }
    this.calculateTotal();
  }

  addProduct() {
    this.authService.currentUser.subscribe((result) => {
      if (!result.passportPhoto || !result.validIdPhoto || !result.bvn) {
        this.toastService.showError('Please complete your profile to add a product', 'Incomplete Profile');
        return;
      }
      this.dialogService.showComponent(AddProductModalComponent, '', 'large');
    });
  }

  checkOut(ref, purchaseItems) {
    const title = 'Payment successfull';
    // console.log(title, ref, purchaseItems);
    purchaseItems.forEach(item => {
      // console.log(item);
      this.purchase.productIds = [];
      this.purchase.productIds.push(item.id);
    });
    this.purchaseService.create(this.purchase).subscribe((result) => {
      if (result) {
        this.toastService.showSuccess('Your Purchase was successful', 'Puchase Success');
        this.cartItems = [];
      }
    }, (err) => {
      this.toastService.showSuccess('Something went wrong', 'Puchase Failed');
    });
  }

  removeItem(item) {
    this.cartItems = this.cartItems.filter((x) => x !== item );
    this.calculateTotal();
  }

  calculateTotal() {
    this.totalPrice = this.cartItems.reduce((sum, current) => sum + parseInt(current.price, 10), 0);
  }

  paymentInit() {
    console.log('Payment initialized', this.totalPrice);
  }

  paymentDone(ref: any) {
    const title = 'Payment successfull';
    console.log(title, ref);
  }

  paymentCancel() {
    console.log('payment failed');
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
