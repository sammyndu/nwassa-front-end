import { ChangePasswordComponent } from './change-password/change-password.component';
import { ChangePassword } from './models/changePassword.model';
import { AuthenticationService } from './../_services/authentication.service';
import { UserInfo } from './models/userInfo.model';
import { IDialogComponent } from '../shared/widgets/dialog/dialog-component';
import { OnInit, Component, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { DialogActionResult } from '@app/shared/widgets/dialog/dialog-action-result.model';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NgForm } from '@angular/forms';
import { UserService } from '@app/_services';
import { ToastService } from '@app/_services/toast.service';
import { environment } from '@environments/environment';
import { DialogService } from '@app/shared/widgets/dialog/dialog.service';

@Component({
    selector: 'app-add-product',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit, IDialogComponent {

    actionResult = new EventEmitter<DialogActionResult>();
    @ViewChild('personalInfoForm') profileForm: NgForm;
    @ViewChild('userPassportPhoto', {static: false}) passportPhoto: ElementRef;
    @ViewChild('userIdCard', {static: false}) idCard: ElementRef;

    public togglePersonalInfoSaveButton = false;
    public isProcessing = false;
    public user = new UserInfo();
    public personalInfo = new UserInfo();
    public defaultImg = '/assets/img/userImage.png';

    constructor(
        private modalRef: BsModalRef,
        private authService: AuthenticationService,
        private dialogService: DialogService,
        private userService: UserService,
        private toastService: ToastService) {
    }

    ngOnInit() {
        this.authService.currentUser.subscribe((result) => {
            console.log(result);
            this.user = result.user;
            this.personalInfo.fromdto(result.user);
        });
    }

    editButtonClicked() {
        this.togglePersonalInfoSaveButton = !this.togglePersonalInfoSaveButton;
    }

    cancelPersonalInfoEditClicked() {
        this.togglePersonalInfoSaveButton = !this.togglePersonalInfoSaveButton;
        this.profileForm.form.markAsPristine();
        this.personalInfo.fromdto(this.user);
        console.log(this.profileForm);
    }

    uploadIdCard() {
        this.isProcessing = true;
        const formData = new FormData();

        console.log(this.idCard.nativeElement.files);

        if (this.idCard.nativeElement.files.length === 0) {
            this.isProcessing = false;
            return;
        }
        formData.append('idCard', this.idCard.nativeElement.files[0]);
        formData.append('id', this.user.id);
        this.userService.updateFile(formData).subscribe(() => {
            this.toastService.showSuccess('Your Product Image was updated successfully', 'Image Update Success');
            this.isProcessing = false;
            // this.imgUrl = `${environment.imgUrl}?img=${this.idCard.nativeElement.files[0].name}&id=${this.user.id}`;
        }, (err) => {
            this.toastService.showError('Something went wrong', 'Update Failed');
            this.isProcessing = false;
            console.log(err);
        });
    }

    uploadPassportPhoto() {}

    save(id: any) {
        this.isProcessing = true;
        this.userService.update(this.personalInfo).subscribe(() => {
            this.toastService.showSuccess('Your Profile was updated successfully', 'Update Success');
            this.isProcessing = false;
        }, (err) => {
            this.toastService.showError('Something went wrong', 'Update Failed');
            this.isProcessing = false;
            console.log(err);
        });

    }

    changePassword() {
        this.dialogService.showComponent(ChangePasswordComponent);
    }

    dismiss() {
        this.modalRef.hide();
    }
}
