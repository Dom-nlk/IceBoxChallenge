
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = false

  constructor() { }

  
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
