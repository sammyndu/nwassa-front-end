import { DialogAction } from './dialog-action.enum';

export class DialogActionResult {
  constructor(
    public action: DialogAction,
    public data?: any) {}
}
