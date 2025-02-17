import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onLogin(): void {
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        
        // If successful, check the user role and redirect
        console.log('Login successful', response); // This will print the user object
        this.authService.setCurrentUser(response);  // Set the current user in AuthService
        // Assuming `response` contains a `role` property to check the user's role
        const role = response.role;
console.log('votre role est',role);
        // Redirect based on the role
        if (role === 'RH') {
          this.router.navigate(['/employees']); // Redirect to 'employees' component for RH
        } else if (role === 'MANAGER') {
          this.router.navigate(['/manager']); // Redirect to 'manager' component for manager
        } else if (role === 'EMPLOYE') {
          this.router.navigate(['/profil']); // Redirect to 'profil' component for employe
        }
      },
      error: (error) => {
        // If failed, handle the error
        if (error.status === 401) {
          console.log('Login failed');
          alert("Veuillez vérifier vos données!");

        }
      }
    });
  }
}
