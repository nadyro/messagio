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
  ngOnInit() {
    this.usersService.getUsers().subscribe((res) => {
      console.log(res);
      this.users = res;
    });
  }
  update_element(e) {
    if (e.name === "edit_profile_first_name")
      this.users[0].first_name = e.value;
    if (e.name === "edit_profile_last_name")
      this.users[0].last_name = e.value;
    if (e.name === "edit_profile_email")
      this.users[0].email = e.value;
    if (e.name === "edit_profile_bio")
      this.users[0].bio = e.value;
    if (e.name === "edit_profile_password")
      this.users[0].password = e.value;
    this.usersService.updateUsers(this.users[0]).subscribe((res) => {
      console.log(res);
    });
  }
  hover(e) {
    e.target.previousSibling.innerHTML = this.users[0].bio;
  }
  unhover(e) {
    e.target.previousSibling.innerHTML = "";
  }

}
