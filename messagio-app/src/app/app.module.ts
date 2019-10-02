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

console.log(sessionStorage);
const Routes: Routes = [];
/*if (sessionStorage.length === 0)
{
  Routes.push({path: '', component: SigninComponent });
  Routes.push({ path: 'signup', component: SignupComponent });
  Routes.push({ path: 'messagio', component: MessagioComponent });
  Routes.push({ path: 'dashboard', component: DashboardComponent });
}
else{*/
  Routes.push({path: '', component: DashboardComponent });
  Routes.push({ path: 'signup', component: SignupComponent });
  Routes.push({ path: 'signin', component: SigninComponent });
  Routes.push({ path: 'messagio', component: MessagioComponent });
//}



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