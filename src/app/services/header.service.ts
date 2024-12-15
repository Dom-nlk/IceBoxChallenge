
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  private headerText = new BehaviorSubject<string>('Dashboard');
  currentHeaderText = this.headerText.asObservable();

  constructor() { }

  changeHeaderText(newText: string) {
    this.headerText.next(newText);
  }
}
