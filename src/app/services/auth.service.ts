
import { inject, Injectable } from '@angular/core';
import { Auth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut, User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = false

  private user: User | null = null;
  private loggedIn$ = new BehaviorSubject<boolean>(false);

  constructor(
    private auth: Auth,
    private router: Router
  ) {
    this.auth.onAuthStateChanged((user) => {
      this.user = user;
      this.loggedIn$.next(!!user)
    })
   }




    // Connexion avec Google
    async loginWithGoogle(email: string, password: string): Promise<void> {
      try {
        const provider = new GoogleAuthProvider();
        // const result = await signInWithPopup(this.auth, provider);
        const result = await signInWithEmailAndPassword(this.auth, email, password);
        this.user = result.user;
        this.loggedIn$.next(true)
        console.log('Utilisateur connecté : ', this.user);
        this.router.navigate(['/dashboard']);
      } catch (error) {
        console.error('Erreur de connexion :', error);
        throw error; // Lancer une erreur pour gérer dans le composant
      }
    }
  
    // Déconnexion
    async logoutWithGoogle(): Promise<void> {
      await signOut(this.auth);
      this.user = null;
      this.loggedIn$.next(false)
      console.log('Utilisateur déconnecté');
      this.router.navigate(['/login']);
    }

      // Observable pour suivre l'état de connexion
  isLoggedIn$(): Observable<boolean> {
    return this.loggedIn$.asObservable();
  }
  
    // Vérification de l'état de connexion
    isLoggedInWithGoogle(): boolean {
      return !!this.user;
    }
  
    getUser(): User | null {
      return this.user;
    }




  
  login(email: string, password: string): boolean {
    if (email === 'dom@gmail.com' && password ==='123') {
      this.loggedIn = true
      return this.loggedIn
    }
    return this.loggedIn
  }

  logout() {
    this.loggedIn = false
  }

  isLoggedIn(): boolean {
    return this.loggedIn
  }
  
}
