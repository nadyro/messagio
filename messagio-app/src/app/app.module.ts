import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Routes, RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { MessagioComponent } from './messagio/messagio.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MessagioSocketService } from './services/messagiosocket.service';
import { MessagioService } from './services/messagio.service';
import { UsersService } from './services/users.service';
import { SigninService } from './services/signin.service';

const Routes: Routes = [
  { path: '', component: MessagioComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'dashboard', component: DashboardComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    MessagioComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(Routes),
    AppRoutingModule
  ],
  providers: [
    MessagioService,
    MessagioSocketService,
    UsersService,
    SigninService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }