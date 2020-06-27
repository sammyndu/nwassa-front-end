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
  templateUrl: './phone-register.component.html'
})
export class PhoneRegisterComponent implements OnInit, IDialogComponent {

  public actionResult: EventEmitter<DialogActionResult> = new EventEmitter<DialogActionResult>();
  public registerModel = new RegisterModel();
  public isProcessing = false;

  constructor(
    private modalref: BsModalRef,
    private authService: AuthenticationService) { }

  ngOnInit(): void {
  }

  register(form: NgForm) {
    if (form.valid) {
      this.authService.register(this.registerModel)
      .subscribe((result) => {
        this.actionResult.emit(new DialogActionResult(DialogAction.ok, result));
        this.dismiss();
      },
      (err) => {
        console.log(err);
        this.dismiss();
    });
    }
    else {
      console.log(form.errors);
    }
  }

  dismiss(action?: DialogAction): void {
    this.modalref.hide();
  }

}
