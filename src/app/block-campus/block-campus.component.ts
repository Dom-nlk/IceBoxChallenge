import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Campus } from '../models/campus';
import { NgClass, NgStyle } from '@angular/common';

@Component({
  selector: 'app-block-campus',
  standalone: true,
  imports: [
    NgClass,
    NgStyle
  ],
  templateUrl: './block-campus.component.html',
  styleUrl: './block-campus.component.scss'
})
export class BlockCampusComponent {

  @Input() campus!: Campus;
  @Input() color!: string;
  @Input() isClickable: boolean = true; // Par défaut, le composant est cliquable.

  constructor(private router: Router) {}

  OnCampus() {
    if (this.isClickable) {
      this.router.navigateByUrl(`dashboard/voting/${this.campus.id}`)
    }
  }
}
