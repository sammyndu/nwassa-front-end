import { Component, ElementRef, OnInit, ViewChild, AfterViewInit, AfterContentInit, AfterContentChecked } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductInfo } from '@app/products/add-product-modal/models/productInfo.model';
import { UserInfo } from '@app/user-profile/models/userInfo.model';
import { AuthenticationService, ProductService, ToastService } from '@app/_services';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

    @ViewChild('productInfoForm') productForm: NgForm;

    public uploadAllowed = false;
    public toggleProductInfoSaveButton = false;
    public isProcessing = false;
    public product = new ProductInfo();
    public productInfo = new ProductInfo();
    public productId: string;
    public defaultImg = '/assets/img/userImage.png';
    public imgUrl: string;
    public user = new UserInfo();
    @ViewChild('productPhoto', {static: false}) productPhoto: ElementRef;

    constructor(
        private productService: ProductService,
        private authService: AuthenticationService,
        private toastService: ToastService,
        private activatedRoute: ActivatedRoute,
        public router: Router) {}

    ngOnInit() {
      this.productId = this.activatedRoute.snapshot.params.id;
      this.productService.get(this.productId).subscribe((result) => {
        this.product = result;
        this.productInfo.fromdto(this.product);
        console.log(result);
        this.imgUrl = `${environment.imgUrl}?img=${this.product.productPhoto}&id=${this.productId}`;
        console.log(this.imgUrl);
      });
      this.authService.currentUser.subscribe((result) => {
          this.user.fromdto(result.user);
      });
    }

    editButtonClicked() {
        this.toggleProductInfoSaveButton = !this.toggleProductInfoSaveButton;
    }

    myProduct() {
        return this.user.id === this.product.owner;
    }

    editImage() {
        this.isProcessing = true;
        const formData = new FormData();

        console.log(this.productPhoto.nativeElement.files);

        if (this.productPhoto.nativeElement.files.length === 0) {
            this.isProcessing = false;
            return;
        }
        formData.append('file', this.productPhoto.nativeElement.files[0]);
        formData.append('id', this.productId);
        this.productService.updateFile(formData).subscribe(() => {
            this.toastService.showSuccess('Your Product Image was updated successfully', 'Image Update Success');
            this.isProcessing = false;
            this.imgUrl = `${environment.imgUrl}?img=${this.productPhoto.nativeElement.files[0].name}&id=${this.productId}`;
        }, (err) => {
            this.toastService.showError('Something went wrong', 'Update Failed');
            this.isProcessing = false;
            console.log(err);
        });
    }

    uploadActivated() {
        if (this.productPhoto.nativeElement.files.length !== 0) {
            this.uploadAllowed = true;
            return;
        }
        this.uploadAllowed = false;
    }

    cancelProductInfoEditClicked() {
        this.toggleProductInfoSaveButton = !this.toggleProductInfoSaveButton;
        this.productForm.form.markAsPristine();
        this.productInfo.fromdto(this.product);
        console.log(this.productForm);
    }

    save(id: any) {
        this.isProcessing = true;
        this.productService.update(this.productInfo).subscribe(() => {
            this.toastService.showSuccess('Your Profile was updated successfully', 'Update Success');
            this.isProcessing = false;
            location.reload();
        }, (err) => {
            this.toastService.showError('Something went wrong', 'Update Failed');
            this.isProcessing = false;
            console.log(err);
        });

    }
}

