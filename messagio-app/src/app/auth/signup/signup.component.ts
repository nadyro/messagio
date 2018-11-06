import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import Users from '../../models/users.model';
import { UsersService } from '../../services/users.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(
    private UserService: UsersService
  ) { }

  public newUser: Users = new Users();
  userList: Users[];

  ngOnInit() {
    this.UserService.getUsers().subscribe(res => {
      console.log(res);
      this.userList = res;
    })
  }

  createUser(){
    this.UserService.createUsers(this.newUser).subscribe(res => {
      console.log(res);
      this.userList.push(res);
      this.newUser = new Users();
    });
  }

}
