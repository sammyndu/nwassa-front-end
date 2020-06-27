import { Injectable, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { SimpleDialogComponent } from './simple-dialog.component';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DialogAction } from './dialog-action.enum';
import { IDialogComponent } from './dialog-component';
import { DialogActionResult } from './dialog-action-result.model';

@Injectable()
export class DialogService {
  constructor(private modalService: BsModalService) {}

  showAlert(title: string, message: string, okText?: string, size?: string): Observable<DialogAction> {
    return this.show(title, message, okText, null, size);
  }

  showConfirm(title: string, message: string, okText?: string, cancelText?: string, size?: string): Observable<DialogAction> {
    const cancelBtnText = cancelText || 'Cancel';

    return this.show(title, message, okText, cancelBtnText, size);
  }

  showComponent(content: string | TemplateRef<any> | any, data?: any, size?: string): Observable<DialogActionResult> {
    const config = {
      initialState: data,
      class: this.getModalSizeClass(size),
      ignoreBackdropClick: true
    };
    const modalRef = this.modalService.show(content, config);
    const modal = modalRef.content as IDialogComponent;

    return modal.actionResult;
  }

  private show(title: string, message: string, okText?: string, cancelText?: string, size?: string): Observable<DialogAction> {
    const initialState = {
      title: title || 'Alert!',
      message: message || '[Please add a message here]',
      okText: okText || 'OK',
      size: size || 'medium',
      cancelText
    };

    const config = {
      class: this.getModalSizeClass(size),
      ignoreBackdropClick: true,
      initialState
    };

    const modalRef = this.modalService.show(SimpleDialogComponent, config);
    const modal = modalRef.content as IDialogComponent;

    return modal.actionResult.pipe(map(v => v.action));
  }

  private getModalSizeClass(size: string) {
    size = size || 'medium';

    switch (size) {
      case 'small':
        return 'modal-sm';

      case 'medium':
        return 'modal-md';

      case 'large':
        return 'modal-lg';

      case 'fullscreen':
        return 'modal-fullscreen';

      default:
        return 'modal-md';
    }
  }
}
