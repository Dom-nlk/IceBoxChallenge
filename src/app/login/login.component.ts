import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  iceForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.iceForm = this.formBuilder.group({
      email: [null],
      password: [null]
    })
  }

  onSubmitForm() {
    console.log(this.iceForm.value.email)

    if (this.authService.login(this.iceForm.value.email, this.iceForm.value.password)) {
      this.router.navigateByUrl('/dashboard')
    } else {
      alert('Email ou mot de passe invalide')
    }
  }

  loginWithGoogle() {
    this.authService.loginWithGoogle();
  }
}
