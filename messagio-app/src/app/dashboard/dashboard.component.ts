import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  outputs: ['toHover']
})
export class DashboardComponent implements OnInit {

  constructor(
    private usersService: UsersService
  ) { }
  users = [];
  bio_hovered = "";
  user_session = JSON.parse(sessionStorage.getItem('user_session'));
  ngOnInit() {
    this.usersService.getUsers().subscribe((res) => {
      this.users = res;
    });
  }
  talkto(user){
    sessionStorage.setItem('user_interlocutor', JSON.stringify(user));
  }
  update_element(e) {
    if (e.name === "edit_profile_first_name")
      this.user_session['first_name'] = e.value;
    if (e.name === "edit_profile_last_name")
      this.user_session['last_name'] = e.value;
    if (e.name === "edit_profile_email")
      this.user_session['email'] = e.value;
    if (e.name === "edit_profile_bio")
      this.user_session['bio']= e.value;
    this.usersService.updateUsers(this.users[0]).subscribe((res) => {
      return res;
    });
  }
  hover(e) {
    e.target.previousSibling.innerHTML = this.users[0].bio;
  }
  unhover(e) {
    e.target.previousSibling.innerHTML = "";
  }

}
