import { HttpClient } from '@angular/common/http';
import { MessagioService } from './services/messagio.service';
import Messagio from './models/messagio.model';
//import { MessagioChatService } from './services/messagiochat.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { MessagioSocketService } from './services/messagiosocket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  message: Observable<any>;
  Connection;
  result = null;
  constructor(
    private messagioService: MessagioService, /*private chatService: MessagioChatService,*/ private chatServices: MessagioSocketService
  ) { }

  public newMessagio: Messagio = new Messagio()

  messagiosList: Messagio[];

  sendMessage() {
    this.chatServices.sendMessage(this.newMessagio.content);
  }

  ngOnInit(): void {
    this.messagioService.getMessagios()
      .subscribe(messagios => {
        this.messagiosList = messagios
      })
    this.Connection = this.chatServices.getMessage().subscribe(res => {
      this.messagiosList.push(this.newMessagio);
      this.newMessagio = new Messagio();
    });
  }

  create() {
    this.messagioService.createMessagio(this.newMessagio).subscribe((res) => {
      console.log(res);
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
