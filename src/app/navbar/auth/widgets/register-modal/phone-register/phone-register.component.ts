import { Router } from '@angular/router';
import { ToastService } from './../../../../../_services/toast.service';
import { AuthenticationService } from '@app/_services';
import { RegisterModel } from './../../../models/register.model';
import { IDialogComponent } from './../../../../../shared/widgets/dialog/dialog-component';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { DialogActionResult } from '@app/shared/widgets/dialog/dialog-action-result.model';
import { DialogAction } from '@app/shared/widgets/dialog/dialog-action.enum';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-phone-register',
  templateUrl: './phone-register.component.html',
  styleUrls: ['./phone-register.component.scss']
})
export class PhoneRegisterComponent implements OnInit, IDialogComponent {

  public actionResult: EventEmitter<DialogActionResult> = new EventEmitter<DialogActionResult>();
  public registerModel = new RegisterModel();
  public showError = false;
  public errMessage = '';
  public isProcessing = false;

  constructor(
    private modalref: BsModalRef,
    private authService: AuthenticationService,
    private router: Router,
    private toastService: ToastService) { }

  ngOnInit(): void {
  }

  register(form: NgForm) {
    this.isProcessing = true;
    if (form.valid) {
      this.authService.register(this.registerModel)
      .subscribe((result) => {
        this.isProcessing = false;
        this.actionResult.emit(new DialogActionResult(DialogAction.ok, result));
        this.dismiss();
        this.toastService.showSuccess('You have been Registered sucessfully', 'Registeration Successful');
        this.router.navigate(['/products']);
      },
      (err) => {
        this.isProcessing = false;
        console.log(err);
        if (err.error)  {
          if (err.error.message.includes('User')) {
            this.showError = true;
            this.errMessage = err.error.message;
          }
        }
        this.toastService.showError('Something went wrong', 'Registeration Failed');
    });
    }
    else {
      console.log(form.errors);
    }
  }

  passwordNotMatchErrorDisplay() {
    return this.registerModel.password !== this.registerModel.confirmPassword;
  }

  dismiss(action?: DialogAction): void {
    this.modalref.hide();
  }

}
