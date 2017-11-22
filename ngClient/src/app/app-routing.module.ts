import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditComponent } from './edit/edit.component';
import { LoginComponent } from './login/login.component';
import { AdditemComponent } from './additem/additem.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'items',
    component: DashboardComponent,
    pathMatch: 'full'
  },
  {
    path: 'items/new/:user',
    component: AdditemComponent,
    pathMatch: 'full'
  },
  {
    path: 'items/:id',
    component: EditComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
