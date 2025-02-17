import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = 'http://localhost:8080/api/login';  // URL pour la connexion
  private logoutUrl = 'http://localhost:8080/api/logout'; // URL pour la déconnexion
  private currentUserSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public currentUser = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    const credentials = { username, password };
    return this.http.post<any>(this.loginUrl, credentials).pipe(
      tap((userDTO) => {
        // Stocker les informations de l'utilisateur connecté dans le subject
        this.currentUserSubject.next(userDTO);
      })
    );
  }

  logout(): Observable<any> {
    return this.http.post<any>(this.logoutUrl, {}).pipe(
      tap(() => {
        // Effacer les informations de l'utilisateur lorsqu'il se déconnecte
        this.currentUserSubject.next(null);
      })
    );
  }

  setCurrentUser(user: any) {
    this.currentUserSubject.next(user); // Stocker les données de l'utilisateur lors de la connexion
  }

  getCurrentUser(): any {
    return this.currentUserSubject.value; // Récupérer l'utilisateur actuellement connecté
  }
  getUserById(userId: number): Observable<any> {
    return this.http.get<any>(`http://localhost:8080/users/${userId}`);
  }
  
  
}
