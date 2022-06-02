import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SettingsComponent } from './Components/settings/settings.component';
import { EventsComponent } from './Components/events/events.component';
import { GroupsComponent } from './Components/groups/groups.component';
import { HomeComponent } from './Components/home/home.component';
import { MessagesComponent } from './Components/messages/messages.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { ErrorPageComponent } from './Components/error-page/error-page.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { CommentService } from './services/comment.service';
//import { AddPostComponent } from './Components/add-post/add-post.component';
import { AuthenticationService } from './services/authentication.service';
import { PostService } from './services/post.service';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SettingsComponent,
    EventsComponent,
    GroupsComponent,
    HomeComponent,
    MessagesComponent,
    LoginComponent,
    RegisterComponent,
    ErrorPageComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    FormsModule
  ],
  providers: [AuthenticationService,PostService,CommentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
