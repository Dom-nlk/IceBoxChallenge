import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loading-page',
  standalone: true,
  imports: [],
  templateUrl: './loading-page.component.html',
  styleUrl: './loading-page.component.scss'
})
export class LoadingPageComponent implements OnInit {
  logo: string = "/e_blood_logo_white.png"

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.logo = '/e_blood_logo_red.png';
      this.changeCssVariables('--white-color', '#ff9d00');
      this.changeCssVariables('--orange-color', 'white');

      setTimeout(()=>{
        this.router.navigateByUrl('/login');
      }, 2000);
    }, 3000); // Change the image after 2 seconds
  }

  changeCssVariables(variable: string, value: string) {
    document.documentElement.style.setProperty(variable, value);
  }
}
