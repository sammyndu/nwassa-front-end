import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@app/_services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public user;

  constructor(private authService: AuthenticationService) {

  }

  ngOnInit() {
    console.log();
    this.authService.currentUser
    .subscribe((result) => {
      this.user = result;
      console.log(result);
    });
  }

}
