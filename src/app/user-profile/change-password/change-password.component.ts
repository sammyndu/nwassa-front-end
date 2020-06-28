import { UserInfo } from './../models/userInfo.model';
import { User } from './../../_models/user';
import { ToastService } from './../../_services/toast.service';
import { AuthenticationService } from '@app/_services';
import { ChangePassword } from './../models/changePassword.model';
import { IDialogComponent } from './../../shared/widgets/dialog/dialog-component';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { DialogActionResult } from '@app/shared/widgets/dialog/dialog-action-result.model';
import { DialogAction } from '@app/shared/widgets/dialog/dialog-action.enum';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit, IDialogComponent {

  actionResult: EventEmitter<DialogActionResult>;
  public passwordModel = new ChangePassword();
  public isProcessing = false;
  public showError = false;
  public user = new UserInfo();

  constructor(private modalRef: BsModalRef,
              private authService: AuthenticationService,
              private toastService: ToastService) { }

  ngOnInit(): void {
    this.authService.currentUser.subscribe((result) => {
      this.user.fromdto(result.user);
    });
  }

  save() {
    this.isProcessing = true;
    this.passwordModel.email = this.user.email;
    this.authService.changePassword(this.passwordModel).subscribe(() => {
      this.toastService.showSuccess('Your password has been changed successfully', 'Password Change Successful');
      this.isProcessing = false;
      this.dismiss();
    }, (err) => {
      if (err.error.message.includes('Invalid Password')) {
        this.isProcessing = false;
        this.showError = true;
        return;
      }
      this.toastService.showError('Something went wrong', 'Password Change Failed');
      this.isProcessing = false;
      this.dismiss();
    } );
  }

  passwordNotMatchErrorDisplay(){
    return this.passwordModel.newPassword !== this.passwordModel.confirmPassword;
  }

  dismiss(action?: DialogAction): void {
    this.modalRef.hide();
  }

}
