import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuard } from './services/guards/auth.guard';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  { 
    path: '', 
    pathMatch: 'full', 
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent }

];



@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }