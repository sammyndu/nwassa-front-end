import { Router } from '@angular/router';
import { DialogService } from './../shared/widgets/dialog/dialog.service';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { LoginModalComponent } from '@app/navbar/auth/widgets/login-modal/login-modal.component';
import { AuthenticationService } from '@app/_services';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public user;

  constructor(
    private dialogService: DialogService,
    private authService: AuthenticationService,
    private router: Router) { }

  ngOnInit(): void {
    this.authService.currentUser
    .subscribe((result: any) => {
      if (result) {
        this.user = result.user;
      }
    });
  }

  get isAuthenticated(): boolean {
    return this.user != null;
  }

  login() {
    const sub = this.dialogService.showComponent(LoginModalComponent);
  }

  logout() {
    this.authService.logout();
    this.user = null;
    this.router.navigate(['/']);
  }

}
