import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  private apiUrl = 'http://localhost:8080/manager';  // API pour gérer les utilisateurs et les managers

  constructor(private http: HttpClient) { }

  // Récupérer les employés d'un manager par ID
  getManagedEmployees(managerId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${managerId}/employees`);
  }}
