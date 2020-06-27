import { DialogService } from './../../../../shared/widgets/dialog/dialog.service';
import { Subscription } from 'rxjs';
import { LoginModel } from './../../models/login.models';
import { AuthenticationService } from '@app/_services/authentication.service';
import { IDialogComponent } from './../../../../shared/widgets/dialog/dialog-component';
import { Component, OnInit, EventEmitter, OnDestroy } from '@angular/core';
import { DialogActionResult } from '@app/shared/widgets/dialog/dialog-action-result.model';
import { DialogAction } from '@app/shared/widgets/dialog/dialog-action.enum';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { RegisterModalComponent } from '../register-modal/register-modal.component';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit, IDialogComponent {

  public actionResult = new EventEmitter<DialogActionResult>();
  public loginModel = new LoginModel();
  public showError = false;
  public errMessage = '';
  public isProcessing = false;
  private subscriptions: Subscription[] = [];

  constructor(
    private bsmodalRef: BsModalRef,
    private authService: AuthenticationService,
    private dialogService: DialogService) { }

  ngOnInit(): void {
  }

  login() {
    this.isProcessing = true;
    const userLogin = this.loginModel;
    this.authService.login(userLogin.username, userLogin.password)
      .subscribe((result) => {
        this.actionResult.emit(new DialogActionResult(DialogAction.ok, result));
        this.dismiss();
        this.isProcessing = false;
      },
      (err) => {
        this.showError = true;
        this.errMessage = err.error.message;
        this.isProcessing = false;
        console.log(err);
    });
  }

  register() {
    this.dismiss();
    const sub = this.dialogService.showComponent(RegisterModalComponent);
  }

  dismiss(action?: DialogAction): void {
   this.bsmodalRef.hide();
  }

}
