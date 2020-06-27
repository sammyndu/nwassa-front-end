import { UserInfo } from '@app/user-profile/models/userInfo.model';
import { AuthenticationService } from '@app/_services';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
 @Input() public product: any;
 @Output() public selectedProduct: EventEmitter<any> = new EventEmitter<any>();
 public defaultImgUrl = '/assets/img/maize-plantation.jpg';
 public user: UserInfo;

  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.authService.currentUser.subscribe((response) => {
      this.user = response.user;
    });
  }

  myProduct(id: string) {
    return this.user.id === id;
  }

  addToCart(productItem) {
    this.selectedProduct.emit(productItem);
  }

  stop(event: Event, productItem) {
    event.stopPropagation();
    this.addToCart(productItem);
  }

}
