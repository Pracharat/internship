import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DisburseComponent } from './disburse/disburse.component';
import { DisburseModule } from './disburse/disburse.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './core/components/login/login.component';
import { HomeComponent } from './core/components/home/home.component';
import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';

import { AuthGuardGuard } from '@app-auth/auth-guard.guard';


const routes: Routes = [
  { path: 'disburse' ,
    loadChildren : () => import( './disburse/disburse.module').then(m=> m.DisburseModule),
    canActivate: [AuthGuardGuard]
  },
  { path: 'login' , component : LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuardGuard] },
  { path: '**', component: PageNotFoundComponent, canActivate: [AuthGuardGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
