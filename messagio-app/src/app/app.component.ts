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
  Connection;
  constructor(
    private messagioService: MessagioService, /*private chatService: MessagioChatService,*/ private chatServices: MessagioSocketService
  ) { }

  public newMessagio: Messagio = new Messagio();

  messagiosList: Messagio[];
  counter: number = 0;

  sendMessage() {
    console.log("Send Message");
    this.newMessagio.date = this.messagioService.parsingDate();
    this.chatServices.sendMessage(this.newMessagio);
  }

  ngOnInit(): void {
    this.messagioService.getMessagios()
      .subscribe(messagios => {
        console.log(messagios);
        this.messagiosList = messagios;
        this.counter = this.messagiosList.length;
      })
    
    this.Connection = this.chatServices.getMessage().subscribe(res => {
      console.log("Connection")
      this.messagiosList.push(res['object']);
      this.newMessagio = new Messagio();
    });
  }

  create() {
    this.counter++;
    this.newMessagio.position = this.counter;
    this.messagioService.createMessagio(this.newMessagio).subscribe((res) => {
      console.log("Create");
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
