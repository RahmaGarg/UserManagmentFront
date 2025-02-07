import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = 'http://localhost:8080/api/login';  // URL for login
  private logoutUrl = 'http://localhost:8080/api/logout'; // URL for logout
  private currentUserSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public currentUser = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    const credentials = { username, password };
    return this.http.post<any>(this.loginUrl, credentials);
  }

  logout(): Observable<any> {
    return this.http.post<any>(this.logoutUrl, {}).pipe(
      tap(() => {
        // Clear user info when logging out
        this.currentUserSubject.next(null);
      })
    );
  }

  setCurrentUser(user: any) {
    this.currentUserSubject.next(user); // Store user data when logged in
  }

  getCurrentUser(): any {
    return this.currentUserSubject.value; // Get current logged-in user
  }
}
