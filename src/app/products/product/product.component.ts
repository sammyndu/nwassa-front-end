import { DeleteModalComponent } from './../delete-modal/delete-modal.component';
import { DialogService } from './../../shared/widgets/dialog/dialog.service';
import { UserInfo } from '@app/user-profile/models/userInfo.model';
import { AuthenticationService } from '@app/_services';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DialogAction } from '@app/shared/widgets/dialog/dialog-action.enum';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
 @Input() public product: any;
 @Output() public selectedProduct: EventEmitter<any> = new EventEmitter<any>();
 @Output() public deletedProduct: EventEmitter<any> = new EventEmitter<any>();
 public defaultImgUrl = '/assets/img/maize-plantation.jpg';
 public user = new UserInfo();
 @Input() public isProcessing: boolean;

  constructor(private authService: AuthenticationService, private dialogService: DialogService) { }

  ngOnInit(): void {
    this.authService.currentUser.subscribe((response) => {
      if (response) {
        this.user = response.user;
      }
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

  delete(event, id: string) {
    event.stopPropagation();
    this.dialogService.showComponent(DeleteModalComponent).subscribe((result) => {
      if (result.action === DialogAction.ok) {
        this.deletedProduct.emit(id);
      }
    });
  }

}
