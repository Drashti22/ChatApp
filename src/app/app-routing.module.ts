import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { SignupComponent } from './Components/signup/signup.component';

import { UserlistComponent } from './Components/userlist/userlist.component';
import { AuthGuard } from './Gaurds/auth.guard';
import { MessageHistoryComponent } from './components/message-history/message-history.component';

const routes: Routes = [
  {path : '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'userlist', component: UserlistComponent, canActivate: [AuthGuard]},
  {path: 'conversation/:userId', component: MessageHistoryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  // providers: [AuthGuard]
})
export class AppRoutingModule { }
