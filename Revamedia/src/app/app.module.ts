
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { CommentService } from './Shared/services/user-comments-service/comment.service';
import { GiphyService } from './Shared/services/giphy-service/giphy.service';
import { AuthenticationService } from './Shared/services/auth-service/authentication.service';
import { FormsModule } from '@angular/forms';
import { ValidateEqualModule } from 'ng-validate-equal';
import { CookieService } from 'ngx-cookie-service';
import { ResetComponent } from './Components/reset/reset.component';
import { ForgotComponent } from './Components/forgot/forgot.component';
import { GroupComponent } from './Components/group/group.component';
import { TwofaComponent } from './Components/twofa/twofa.component';
import { PostCommentReplyComponent } from './Components/post-comment-reply/post-comment-reply.component';
import { PostCommentComponent } from './Components/post-comment/post-comment.component';
import { PostComponent } from './Components/post/post.component';
import { HomePageTitleComponent } from './Components/home-page-title/home-page-title.component';
import { NoPostComponent } from './Components/no-post/no-post.component';
import { PostAddComponent } from './Components/post-add/post-add.component';
import { PostEditComponent } from './post-edit/post-edit.component';
import { PostDeleteComponent } from './post-delete/post-delete.component';
import { PostCommentAddComponent } from './Components/post-comment-add/post-comment-add.component';

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
    ProfileComponent,
    ResetComponent,
    ForgotComponent,
    GroupComponent,
    TwofaComponent,
    PostCommentReplyComponent,
    PostCommentComponent,
    PostComponent,
    HomePageTitleComponent,
    NoPostComponent,
    PostAddComponent,
    PostEditComponent,
    PostDeleteComponent,
    PostCommentAddComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    FormsModule,
    HttpClientModule,
    FormsModule,
    ValidateEqualModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [AuthenticationService, CommentService, GiphyService, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
