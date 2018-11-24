import { Component, OnInit } from '@angular/core';
import Users from '../../models/users.model';
import { SigninService } from '../../services/signin.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  constructor(private SigninService: SigninService) { }
  public checkUser = new Users();
  ngOnInit() {
  }
session;
  check_session(){
    console.log("check session")
    this.session = this.SigninService.getSession().subscribe(res => {
      console.log("Check Session : ");
      console.log(res);
    });
  }
  check_user(){
    console.log("check_user")
    console.log(this.checkUser);
    this.SigninService.getUserByEmail(this.checkUser).subscribe(res => {
      console.log(res['data']);
    })
  }

}
