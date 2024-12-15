import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { HeaderService } from '../services/header.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  public displayText: string = ''
  imageProfile: string = "/dom.jpeg"

  constructor(
    private router: Router, 
    private headerService: HeaderService
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        //this.updateDisplayText(event.urlAfterRedirects)
        this.headerService.currentHeaderText.subscribe(
          text => this.displayText = text
        )
      }
    })
  }

  /*
  updateDisplayText(url: string): void {
    switch (url) {
      case '/dashboard/livreurs':
        this.displayText = "Livreurs";
        break;
      case '/dashboard/glacieres':
        this.displayText = "Glacières";
        break;
      case '/dashboard/maps':
        this.displayText = "Maps";
        break;
      case '/dashboard/parametres':
        this.displayText = "Paramètres";
        break;
      default:
        this.displayText = "Dashboard";
        break;
    }
  }
  */
}
