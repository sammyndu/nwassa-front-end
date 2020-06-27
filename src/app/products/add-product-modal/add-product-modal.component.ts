import { ProductService } from './../../_services/product.service';
import { IDialogComponent } from './../../shared/widgets/dialog/dialog-component';
import { OnInit, Component, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { ProductInfo } from './models/productInfo.model';
import { DialogActionResult } from '@app/shared/widgets/dialog/dialog-action-result.model';
import { DialogAction } from '@app/shared/widgets/dialog/dialog-action.enum';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NgForm } from '@angular/forms';


@Component({
    selector: 'app-add-product-modal',
    templateUrl: './add-product-modal.component.html',
    styleUrls: ['./add-product-modal.component.scss']
})
export class AddProductModalComponent implements OnInit, IDialogComponent {

    public productInfo = new ProductInfo();
    public submitting = false;
    public actionResult = new EventEmitter<DialogActionResult>();
    @ViewChild('productPhoto', {static: false}) productPhoto: ElementRef;

    constructor(private modalRef: BsModalRef, private productService: ProductService) {}

    ngOnInit()  {}

    addProduct(form: NgForm) {
        this.submitting = true;
        if (form.valid) {
            const formData = new FormData();
            formData.append('file', this.productPhoto.nativeElement.files[0]);
            formData.append('product', JSON.stringify(this.productInfo));

            this.productService.create(formData).subscribe(result => {
                console.log(result);
                this.dismiss();
            }, (err) => {
                console.log(err);
            });
        }
        else {
            console.log(form);
        }
    }

    dismiss(action?: DialogAction): void {
        this.modalRef.hide();
    }
}
