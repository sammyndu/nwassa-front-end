import { AuthenticationService } from '@app/_services';
import { RegisterModel } from './../../models/register.model';
import { IDialogComponent } from './../../../../shared/widgets/dialog/dialog-component';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { DialogActionResult } from '@app/shared/widgets/dialog/dialog-action-result.model';
import { DialogAction } from '@app/shared/widgets/dialog/dialog-action.enum';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrls: ['./register-modal.component.scss']
})
export class RegisterModalComponent implements OnInit, IDialogComponent {

  public actionResult: EventEmitter<DialogActionResult> = new EventEmitter<DialogActionResult>();
  public registerModel = new RegisterModel();
  public registerMode = false;
  public emailRegister = false;
  public phoneRegister = false;

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

  chooseEmail() {
    this.registerMode = true;
    this.emailRegister = true;
  }

  choosPhone() {
    this.registerMode = true;
    this.phoneRegister = true;
  }


  dismiss(action?: DialogAction): void {
    this.modalref.hide();
  }

}
