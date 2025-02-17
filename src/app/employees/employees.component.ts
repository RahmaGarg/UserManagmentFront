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
  selectedUser: any = null; // Utilisateur sélectionné pour affecter un manager
  isManagerModalOpen: boolean = false; // Pour savoir si le modal est ouvert pour le manager
  isUserModalOpen: boolean = false; // Pour savoir si le modal est ouvert pour l'ajout d'utilisateur

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
      this.closeUserModal(); // Fermer le modal après la création
    });
  }
// Supprimer un utilisateur avec confirmation
deleteUser(id: number): void {
  const confirmation = window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?");
  if (confirmation) {
    this.userService.deleteUser(id).subscribe(() => {
      this.users = this.users.filter(user => user.id !== id);
    });
  }
}

  // Ouvre le modal et sélectionne l'utilisateur
  openManagerModal(user: any) {
    this.selectedUser = user;
    this.isManagerModalOpen = true;
  }

  // Ferme le modal pour le manager
  closeManagerModal() {
    this.isManagerModalOpen = false;
    this.selectedUser = null;
    this.managerId = 0;
  }

  // Affecte un manager à un employé
// Affecte un manager à un employé
assignManager() {  
  if (this.managerId && this.selectedUser) {  
    this.userService.setManagerToEmployee(this.selectedUser.id, this.managerId)  
      .subscribe(() => {  
        // Mettre à jour localement après une affectation réussie  
        this.selectedUser.managerId = this.managerId;  
        this.closeManagerModal();  
        alert("L'affectation est réussie!");

        this.getUsers(); // Recharger la liste pour refléter les changements  
      }, error => {  
        console.error("Erreur lors de l'affectation du manager", error);  
        alert("Erreur lors de l'affectation du manager");

      });  
  }  
}


  // Ouvre le modal pour créer un nouvel utilisateur
  openUserModal() {
    this.isUserModalOpen = true;
  }

  // Ferme le modal pour créer un nouvel utilisateur
  closeUserModal() {
    this.isUserModalOpen = false;
    this.newUser = {}; // Réinitialise les données du formulaire
  }
}
