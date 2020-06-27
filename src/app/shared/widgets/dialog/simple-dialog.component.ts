import {
  Component,
  OnInit,
  Output,
  EventEmitter
} from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { DialogAction } from './dialog-action.enum';
import { IDialogComponent } from './dialog-component';
import { DialogActionResult } from './dialog-action-result.model';

@Component({
  selector: 'app-simple-dialog',
  templateUrl: './simple-dialog.component.html'
})
export class SimpleDialogComponent implements OnInit, IDialogComponent {
  title: string;
  message: string;
  okText: string;
  cancelText: string;
  size: string;
  isConfirm: boolean;

  @Output() actionResult = new EventEmitter<DialogActionResult>();

  constructor(private modalRef: BsModalRef) {}

  ngOnInit(): void {
    this.isConfirm = Boolean(this.cancelText);
  }

  dismiss(action: DialogAction) {
    const result = new DialogActionResult(action);

    this.modalRef.hide();
    this.actionResult.emit(result);
  }
}
