import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { Campus } from '../models/campus';
import { CampusService } from '../services/campus.service';
import { HeaderService } from '../services/header.service';
import { BlockCampusComponent } from '../block-campus/block-campus.component';

@Component({
  selector: 'app-voting',
  standalone: true,
  imports: [
    NgFor,
    BlockCampusComponent
  ],
  templateUrl: './voting.component.html',
  styleUrl: './voting.component.scss'
})
export class VotingComponent {

  listCampuses: Campus[] = []

  constructor(
    private campusService: CampusService,
    private headerService: HeaderService
  ) {}

  ngOnInit() {
    this.headerService.changeHeaderText('Voting');
    this.loadCampuses()
  }

  loadCampuses() {
    this.listCampuses = this.campusService.getCampuses()
    }

    public colors: string[] = [
      '#FF5733', // Rouge orangé
      '#33FF57', // Vert vif
      '#3357FF', // Bleu vif
      '#FF33A1', // Rose vif
      '#FF8C33', // Orange foncé
      '#FFFF33', // Jaune vif
      '#33FFF5', // Cyan
      '#8C33FF', // Violet
      '#FF3333', // Rouge vif
      '#33FF8C'  // Vert menthe
    ];


  
    getColor(index: number): string {
      return this.colors[index % this.colors.length];
    }
  

}
