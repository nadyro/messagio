import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MessagioService } from './services/messagio.service';
import { AppComponent } from './app.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { MessagioChatService } from './services/messagiochat.service';
import { MessagioSocketService } from './services/messagiosocket.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgbModule.forRoot()
  ],
  providers: [
    MessagioService,
    MessagioChatService,
    MessagioSocketService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }