import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {
  user: any = null;   // Stocke l'utilisateur connecté
  manager: any = null; // Stocke les infos du manager s'il existe

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Récupérer l'utilisateur connecté
    this.user = this.authService.getCurrentUser();
      console.log("ID du manager :", this.user.managerId); 

    if (this.user && this.user.managerId) {
      // Appel API pour récupérer les infos du manager

      this.authService.getUserById(this.user.managerId).subscribe(
        (managerData) => {
          this.manager = managerData;
        },
        (error) => {
          console.error("Erreur lors de la récupération du manager :", error);
        }
      );
    }
  }
  getManagerDetails(managerId: number): void {
    // Appel au service pour récupérer les informations du manager
    this.authService.getUserById(managerId).subscribe(
      (managerData) => {
        this.manager = managerData; // Assignation des données du manager
      },
      (error) => {
        console.error('Erreur de récupération des données du manager', error);
      }
    );
  }
}
