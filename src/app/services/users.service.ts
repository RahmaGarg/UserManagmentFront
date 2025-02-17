import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8080/users';  

  constructor(private http: HttpClient) { }

  // Récupérer tous les utilisateurs
  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Créer un nouvel utilisateur
  createUser(user: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, user);
  }

  // Supprimer un utilisateur par ID
  deleteUser(id: number): Observable<void> {  
    return this.http.delete<void>(`${this.apiUrl}/${id}`);  
  }  
  
  setManagerToEmployee(employeeId: number, managerId: number): Observable<any> {  
    return this.http.post<any>(`${this.apiUrl}/${employeeId}/setManager/${managerId}`, {});  
  }
  
  
  
}
