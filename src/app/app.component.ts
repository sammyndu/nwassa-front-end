import { AuthenticationService } from '@app/_services';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'nwassa';
  public user;

  constructor(private authService: AuthenticationService) {

  }

  ngOnInit() {}
}
