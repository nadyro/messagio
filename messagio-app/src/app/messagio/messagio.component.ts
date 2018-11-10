import { Component, OnInit, OnDestroy } from '@angular/core';
import { MessagioService } from '../services/messagio.service';
import { MessagioSocketService } from '../services/messagiosocket.service';
import Messagio from '../models/messagio.model';

@Component({
  selector: 'app-messagio',
  templateUrl: './messagio.component.html',
  styleUrls: ['./messagio.component.scss']
})
export class MessagioComponent implements OnInit, OnDestroy {

  constructor(
    private messagioService: MessagioService, /*private chatService: MessagioChatService,*/ private chatServices: MessagioSocketService

  ) { }

  public newMessagio: Messagio = new Messagio();
  Connection;
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
        this.messagiosList = messagios;
        if (this.messagiosList.length == 5)
          this.counter = this.messagiosList[4].position;
        console.log(this.messagiosList);
      })

    this.Connection = this.chatServices.getMessage().subscribe(res => {
      console.log("Connection")
      console.log(this.messagiosList);
      if (this.messagiosList.length == 5)
        this.messagiosList.splice(0, 1);
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
