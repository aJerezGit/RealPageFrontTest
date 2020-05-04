import { HomeComponent } from './pages/home/home.component';
import { ShowsComponent } from './shows/shows.component';
import { ShowDataComponent } from './show-data/show-data.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { LoginComponent } from './user/login/login.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/user/login' },
  { path: 'home', component: HomeComponent , data: {animation: 'Home'} },
  { path: 'user', component: UserComponent , children: [
    {path: 'register', component: RegistrationComponent, data: {animation: 'User'}},
    {path: 'login', component: LoginComponent, data: {animation: 'User'}}
  ], data: {animation: 'User'}},
  { path: 'shows', component: ShowsComponent , data: {animation: 'Shows'}, canActivate:[AuthGuard] },
  { path: 'show/:id', component: ShowDataComponent, canActivate:[AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
