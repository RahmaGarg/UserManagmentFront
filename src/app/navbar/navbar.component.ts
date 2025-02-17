import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  currentUser: any;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
      console.log('vous êtes connecté en tant que', this.currentUser);
    });
  }

  logout() {
    this.authService.logout().subscribe(
      response => {
        console.log('Déconnexion réussie');
        this.router.navigate(['/']); // Rediriger vers la page de login
      },
      error => {
        console.error('Échec de la déconnexion', error);
      }
    );
  }
}
