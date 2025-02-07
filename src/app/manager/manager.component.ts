// manager.component.ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ManagerService } from '../services/manager.service';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss']
})
export class ManagerComponent implements OnInit {
  managerId: number = 0; // ID du manager authentifié
  employees: any[] = [];  // Liste des employés du manager

  constructor(
    private managerService: ManagerService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.managerId = this.authService.getCurrentUser().id; // Récupère l'ID du manager depuis AuthService
    this.loadManagedEmployees();
  }

  loadManagedEmployees(): void {
    this.managerService.getManagedEmployees(this.managerId).subscribe({
      next: (data) => {
        this.employees = data;  // Stocke les employés récupérés
        console.log('Employés du manager:', this.employees);
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des employés', err);
      }
    });
  }
}
