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
    @ViewChild('passportPhoto', {static: false}) passportPhoto: ElementRef;
    @ViewChild('idCard', {static: false}) idCard: ElementRef;

    public togglePersonalInfoSaveButton = false;
    public isProcessing = false;
    public user = new UserInfo();
    public personalInfo = new UserInfo();
    public uploadIdCardAllowed =  false;
    public uploadPassportAllowed =  false;
    public userImgUrl: string;
    public defaultImg = '/assets/img/userImage.png';

    constructor(
        private modalRef: BsModalRef,
        private authService: AuthenticationService,
        private dialogService: DialogService,
        private userService: UserService,
        private toastService: ToastService) {
    }

    ngOnInit() {
        window.scroll(0, 0);
        this.authService.currentUser.subscribe((result) => {
            this.user = result;
            this.personalInfo.fromdto(result);
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
            this.toastService.showSuccess('Your Id Card was updated successfully', 'Id Card Update Success');
            this.isProcessing = false;
            this.personalInfo.validIdPhoto = this.idCard.nativeElement.files[0].name;
            this.authService.setUserContext(this.personalInfo);
            // this.imgUrl = `${environment.imgUrl}?img=${this.idCard.nativeElement.files[0].name}&id=${this.user.id}`;
        }, (err) => {
            this.toastService.showError('Something went wrong', 'Update Failed');
            this.isProcessing = false;
            console.log(err);
        });
    }

    uploadPassportPhoto() {
        this.isProcessing = true;
        const formData = new FormData();

        console.log(this.passportPhoto.nativeElement.files);

        if (this.passportPhoto.nativeElement.files.length === 0) {
            this.isProcessing = false;
            return;
        }
        formData.append('passportPhoto', this.passportPhoto.nativeElement.files[0]);
        formData.append('id', this.user.id);
        this.userService.updateFile(formData).subscribe(() => {
            this.toastService.showSuccess('Your Passport was updated successfully', 'Passport Update Success');
            this.isProcessing = false;
            this.personalInfo.passportPhoto = this.passportPhoto.nativeElement.files[0].name;
            this.authService.setUserContext(this.personalInfo);
            location.reload();
        }, (err) => {
            this.toastService.showError('Something went wrong', 'Update Failed');
            this.isProcessing = false;
            console.log(err);
        });
    }

    save(id: any) {
        this.isProcessing = true;
        this.userService.update(this.personalInfo).subscribe(() => {
            this.toastService.showSuccess('Your Profile was updated successfully', 'Update Success');
            this.authService.setUserContext(this.personalInfo);
            this.profileForm.form.markAsPristine();
            this.togglePersonalInfoSaveButton = false;
            this.isProcessing = false;
        }, (err) => {
            this.toastService.showError('Something went wrong', 'Update Failed');
            this.isProcessing = false;
            console.log(err);
        });

    }

    uploadIdCardActivated() {
        if (this.idCard.nativeElement.files.length !== 0) {
            this.uploadIdCardAllowed = true;
            return;
        }
        this.uploadIdCardAllowed = false;
    }

    uploadPassportActivated() {
        if (this.passportPhoto.nativeElement.files.length !== 0) {
            this.uploadPassportAllowed = true;
            return;
        }
        this.uploadPassportAllowed = false;
    }

    changePassword() {
        this.dialogService.showComponent(ChangePasswordComponent);
    }

    dismiss() {
        this.modalRef.hide();
    }
}
