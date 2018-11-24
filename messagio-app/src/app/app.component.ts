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
  session = {};
  ngOnInit() {
    console.log("app component")
    this.session = this.signinService.getSession().subscribe(res => {
      console.log("Session : ");
      console.log(res);
    });
  }
}
