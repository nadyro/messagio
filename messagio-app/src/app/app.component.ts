import { Response } from '@angular/http';
import { MessagioService } from './services/messagio.service';
import Messagio from './models/messagio.model';
import { MessagioChatService } from './services/messagiochat.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    //Private todoservice will be injected into the component by Angular Dependency Injector
    private messagioService: MessagioService, private chatService: MessagioChatService
  ) { }

  //Declaring the new todo Object and initilizing it
  public newMessagio: Messagio = new Messagio()

  //An Empty list for the visible todo list
  messagiosList: Messagio[];


  ngOnInit(): void {

    //At component initialization the 
    this.messagioService.getMessagios()
      .subscribe(messagios => {
        //assign the todolist property to the proper http response
        this.messagiosList = messagios
        //console.log(messagios)
      })
      this.chatService.messagios.subscribe(msg => {
        console.log(msg);
      })
  }

  create() {
    this.messagioService.createMessagio(this.newMessagio)
      .subscribe((res) => {
        this.messagiosList.push(res.data)
        this.newMessagio = new Messagio()
      })
  }
  sendMessage() {
    this.chatService.sendMessagios(this.newMessagio.content);
  }
  deleteMessagio(messagio: Messagio) {
    this.messagioService.deleteMessagio(messagio._id).subscribe(res => {
      this.messagiosList.splice(this.messagiosList.indexOf(messagio), 1);
    })
  }
}
