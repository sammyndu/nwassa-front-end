import { LoginModalComponent } from '@app/navbar/auth/widgets/login-modal/login-modal.component';
import { ToastService } from './../_services/toast.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { AuthenticationService } from '@app/_services';
import { DialogService } from '@app/shared/widgets/dialog/dialog.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private toastService: ToastService,
        private dialogService: DialogService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authenticationService.currentUserValue;
        if (currentUser) {
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/']);
        this.dialogService.showComponent(LoginModalComponent);
        this.toastService.showError('you need to login to perform this action', 'Please Login');
        return false;
    }
}
