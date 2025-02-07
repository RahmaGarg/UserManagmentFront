import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';  // <-- Add this line
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { EmployeesComponent } from './employees/employees.component';
import { ManagerComponent } from './manager/manager.component';
import { ProfilComponent } from './profil/profil.component';
import { NavbarComponent } from './navbar/navbar.component'; // Import HttpClientModule


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EmployeesComponent,
    ManagerComponent,
    ProfilComponent,
    NavbarComponent
  ],
  imports: [
    FormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
