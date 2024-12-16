import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgClass
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
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  onSubmitForm() {
    /*
    console.log(this.iceForm.value.email)

    if (this.authService.login(this.iceForm.value.email, this.iceForm.value.password)) {
      this.router.navigateByUrl('/dashboard')
    } else {
      alert('Email ou mot de passe invalide')
    }
    */
    this.authService.loginWithGoogle(this.iceForm.value.email, this.iceForm.value.password);
  } 

  loginWithGoogle() {
    this.authService.loginWithGoogle(this.iceForm.value.email, this.iceForm.value.password);
  }
  onResult() {
    this.router.navigateByUrl('/result')
  }
}
