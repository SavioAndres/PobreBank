import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuard } from './services/guards/auth.guard';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { DepositarComponent } from './pages/depositar/depositar.component';
import { SacarComponent } from './pages/sacar/sacar.component';
import { TransferirComponent } from './pages/transferir/transferir.component';

const routes: Routes = [
  { 
    path: '', 
    pathMatch: 'full', 
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'depositar',
    component: DepositarComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'sacar',
    component: SacarComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'transferir',
    component: TransferirComponent,
    canActivate: [AuthGuard]
  },
  { path: 'registrar', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
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