import { Component, OnInit } from '@angular/core';
import { SigninService } from './services/signin.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private signinService: SigninService
  ) { }
  user_session = JSON.parse(sessionStorage.getItem('user_session'));
  
  ngOnInit() {
  }
}
