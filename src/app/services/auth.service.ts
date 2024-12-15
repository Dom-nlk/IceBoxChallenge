
import { inject, Injectable } from '@angular/core';
import { Auth, GoogleAuthProvider, signInWithPopup, signOut, User } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = false

  private user: User | null = null;

  constructor(
    private auth: Auth,
    private router: Router
  ) { }




    // Connexion avec Google
    async loginWithGoogle(): Promise<void> {
      try {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(this.auth, provider);
        this.user = result.user;
        console.log('Utilisateur connecté : ', this.user);
        this.router.navigate(['/dashboard']);
      } catch (error) {
        console.error('Erreur de connexion :', error);
      }
    }
  
    // Déconnexion
    async logoutWithGoogle(): Promise<void> {
      await signOut(this.auth);
      this.user = null;
      console.log('Utilisateur déconnecté');
      this.router.navigate(['/login']);
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
