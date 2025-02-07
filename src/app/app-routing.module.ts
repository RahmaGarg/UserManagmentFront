import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { EmployeesComponent } from './employees/employees.component';
import { ManagerComponent } from './manager/manager.component';
import { ProfilComponent } from './profil/profil.component';

const routes: Routes = [
  { path: '', component: LoginComponent }, // Default route
  { path: 'employees', component: EmployeesComponent },
  { path: 'manager', component: ManagerComponent },
  { path: 'profil', component: ProfilComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
