import { Component } from '@angular/core';
import { HeaderService } from '../services/header.service';
import { CampusService } from '../services/campus.service';
import { Campus } from '../models/campus';
import { BlockCampusComponent } from '../block-campus/block-campus.component';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-campus',
  standalone: true,
  imports: [
    BlockCampusComponent,
    NgIf,
    NgFor
  ],
  templateUrl: './campus.component.html',
  styleUrl: './campus.component.scss'
})
export class CampusComponent {
  campuses:Campus[]=[]

  groupA: Campus[] = []
  groupB: Campus[] = []
  groupC: Campus[] = []

  public color1: string = '#33FF8C'  // Vert menthe
  public color2: string = '#FF8C33' // Orange foncé
  public color3: string = '#FF3333' // Rouge vif

  constructor(
    private headerService: HeaderService,
    private campusService: CampusService
  ) { 

  }

  ngOnInit() {
    this.headerService.changeHeaderText('Campuses');
    this.organizeByGroup();
    this.campuses = this.campusService.getCampuses()
  }

  organizeByGroup() {
    this.groupA = this.campusService.getCampuses().filter(c => c.group === 'A').sort((a, b) => (b.score ?? 0) - (a.score ?? 0))
    this.groupB = this.campusService.getCampuses().filter(c => c.group === 'B').sort((a, b) => (b.score ?? 0) - (a.score ?? 0))
    this.groupC = this.campusService.getCampuses().filter(c => c.group === 'C').sort((a, b) => (b.score ?? 0) - (a.score ?? 0))
  }

}
