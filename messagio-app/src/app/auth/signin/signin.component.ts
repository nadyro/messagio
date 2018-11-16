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
  check_user(){
    console.log(this.checkUser);
    this.SigninService.getUserByEmail(this.checkUser).subscribe(res => {
      console.log(res);
    })
  }

}
