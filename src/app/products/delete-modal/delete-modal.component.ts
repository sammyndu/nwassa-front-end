import { IDialogComponent } from './../../shared/widgets/dialog/dialog-component';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { DialogActionResult } from '@app/shared/widgets/dialog/dialog-action-result.model';
import { DialogAction } from '@app/shared/widgets/dialog/dialog-action.enum';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss']
})
export class DeleteModalComponent implements OnInit, IDialogComponent {

  actionResult = new EventEmitter<DialogActionResult>();

  constructor(private modalref: BsModalRef) { }

  ngOnInit(): void {
  }

  delete() {
    this.actionResult.emit(new DialogActionResult(DialogAction.ok));
    this.dismiss();
  }

  dismiss(action?: DialogAction): void {
   this.actionResult.emit(new DialogActionResult(DialogAction.cancel));
   this.modalref.hide();
  }

}
