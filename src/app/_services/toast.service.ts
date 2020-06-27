import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ToastService {
    constructor(public toasterService: ToastrService) { }

    showError(message: string, title?: string) {
        this.toasterService.error(message, title);
    }

    showInfo(message: string, title?: string) {
        this.toasterService.info(message, title);
    }

    showWarning(message: string, title?: string) {
        this.toasterService.warning(message, title);
    }

    showSuccess(message: string, title?: string) {
        this.toasterService.success(message, title);
    }

}
