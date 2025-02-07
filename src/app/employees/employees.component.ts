import { Component } from '@angular/core';
import { UserService } from '../services/users.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent {

  users: any[] = [];  // Liste des utilisateurs
  newUser: any = {};  // Pour un nouvel utilisateur
  employeeId: number = 0;  // ID de l'employé
  managerId: number = 0;  // ID du manager

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  // Récupérer tous les utilisateurs
  getUsers(): void {
    this.userService.getAllUsers().subscribe(users => {
      this.users = users;
      console.log(users);
    });
  }

  // Créer un nouvel utilisateur
  createUser(): void {
    this.userService.createUser(this.newUser).subscribe(user => {
      this.users.push(user);
      this.newUser = {};  // Réinitialiser après la création
    });
  }

  // Supprimer un utilisateur
  deleteUser(id: number): void {
    this.userService.deleteUser(id).subscribe(() => {
      this.users = this.users.filter(user => user.id !== id);
    });
  }

  // Affecter un manager à un employé
  setManager(): void {
    this.userService.setManagerToEmployee(this.employeeId, this.managerId).subscribe({
      next: (response) => {
        console.log('Manager assigned response:', response); // Vous pouvez vérifier la réponse ici
        this.getUsers();  // Mettez à jour la liste des utilisateurs
      },
      error: (err) => {
        console.error('Erreur lors de l\'affectation du manager:', err);
        // Vous pouvez également afficher un message d'erreur dans l'UI si nécessaire
      }
    });
  }
  
}


