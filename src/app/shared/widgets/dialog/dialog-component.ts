import { EventEmitter } from '@angular/core';
import { DialogAction } from './dialog-action.enum';
import { DialogActionResult } from './dialog-action-result.model';

export interface IDialogComponent {
  actionResult: EventEmitter<DialogActionResult>;
  dismiss(action: DialogAction): void;
}
