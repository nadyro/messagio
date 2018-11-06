import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MessagioService } from './services/messagio.service';
import { AppComponent } from './app.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
//import { MessagioChatService } from './services/messagiochat.service';
import { MessagioSocketService } from './services/messagiosocket.service';
import { UsersService} from './services/users.service';
import { SigninComponent} from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgbModule.forRoot()
  ],
  providers: [
    MessagioService,
    //MessagioChatService,
    MessagioSocketService,
    UsersService
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }