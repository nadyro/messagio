import { Component, OnInit, OnDestroy } from '@angular/core';
import { MessagioService } from '../services/messagio.service';
import { MessagioSocketService } from '../services/messagiosocket.service';
import Messagio from '../models/messagio.model';
import Users from '../models/users.model';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-messagio',
  templateUrl: './messagio.component.html',
  styleUrls: ['./messagio.component.scss']
})
export class MessagioComponent implements OnInit, OnDestroy {

  constructor(
    private messagioService: MessagioService, private usersService: UsersService, private chatServices: MessagioSocketService

  ) { }

  public newMessagio: Messagio = new Messagio();
  Connection;
  messagiosList: Messagio[];
  counter: number = 0;
  usersList: Users[];
  user_session = JSON.parse(sessionStorage.getItem('user_session'));
  user_interlocutor = JSON.parse(sessionStorage.getItem('user_interlocutor'));

  sendMessage() {
    this.newMessagio.date = this.messagioService.parsingDate();
    this.newMessagio.emitter = this.user_session.first_name + " " + this.user_session.last_name;
    this.newMessagio.receiver = this.user_interlocutor.first_name + " " + this.user_interlocutor.last_name;
    this.newMessagio.id_emitter = this.user_session._id;
    this.newMessagio.id_receiver = this.user_interlocutor._id;
    this.chatServices.sendMessage(this.newMessagio);
  }

  ngOnInit(): void {
    if (this.user_session)
      this.newMessagio.id_emitter = this.user_session._id;
    if (this.user_interlocutor)
      this.newMessagio.id_receiver = this.user_interlocutor._id;
    this.usersService.getUsers().subscribe(users => {
      this.usersList = users;
    })
    if (this.user_session && this.user_interlocutor) {
      this.messagioService.getConversation(this.newMessagio)
        .subscribe(messagios => {
          this.messagiosList = messagios;
          if (this.messagiosList.length == 5)
            this.counter = this.messagiosList[4].position;
        })
    }

    this.Connection = this.chatServices.getMessage().subscribe(res => {
      if (this.messagiosList.length == 5)
        this.messagiosList.splice(0, 1);
      this.messagiosList.push(res['object']);
      this.newMessagio = new Messagio();
    });
  }

  create() {
    this.counter++;
    this.newMessagio.position = this.counter;
    this.newMessagio.emitter = this.user_session.first_name + " " + this.user_session.last_name;
    this.newMessagio.receiver = this.user_interlocutor.first_name + " " + this.user_interlocutor.last_name;
    this.newMessagio.id_emitter = this.user_session._id;
    this.newMessagio.id_receiver = this.user_interlocutor._id;
    this.messagioService.createMessagio(this.newMessagio).subscribe((res) => {
      return res;
    });
  }

  deleteMessagio(messagio: Messagio) {
    this.messagioService.deleteMessagio(messagio._id).subscribe(res => {
      this.messagiosList.splice(this.messagiosList.indexOf(messagio), 1);
    })
  }

  ngOnDestroy() {
    this.Connection.unsubscribe();
  }
}
