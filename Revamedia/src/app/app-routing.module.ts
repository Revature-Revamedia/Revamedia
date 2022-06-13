import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsComponent } from './Components/settings/settings.component';
import { EventsComponent } from './Components/events/events.component';
import { GroupsComponent } from './Components/groups/groups.component';
import { HomeComponent } from './Components/home/home.component';
import { MessagesComponent } from './Components/messages/messages.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { ErrorPageComponent } from './Components/error-page/error-page.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { AuthGuard } from './Shared/guard/auth.guard';
import { ResetComponent } from './Components/reset/reset.component';
import { ForgotComponent } from './Components/forgot/forgot.component';
import { GroupComponent } from './Components/group/group.component';
import { QrcodeComponent } from './Components/qrcode/qrcode.component';
import { TwofaComponent } from './Components/twofa/twofa.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'login/twofa', component: TwofaComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent, canActivate:[AuthGuard]},
  { path: 'messages', component: MessagesComponent,canActivate:[AuthGuard]},
  // { path: 'events', component: EventsComponent },
  { path: 'groups', component: GroupsComponent },
  { path: 'group/:id', component: GroupComponent },
  { path: 'settings', component: SettingsComponent,canActivate:[AuthGuard]},
  { path: 'profile/:id', component: ProfileComponent,canActivate:[AuthGuard]},
  { path: 'forgot', component: ForgotComponent},
  { path: 'forgot/reset', component: ResetComponent},
  { path: 'qrcode', component: QrcodeComponent},
  { path: '',   redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: ErrorPageComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
