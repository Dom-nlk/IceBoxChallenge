import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { HeaderService } from '../services/header.service';
import { BarChartComponent } from '../bar-chart/bar-chart.component';
import { BarPieComponent } from '../bar-pie/bar-pie.component';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [
    BarChartComponent,
    BarPieComponent,
    NgFor
  ],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent implements OnInit {



  constructor(private headerService: HeaderService) { }

  ngOnInit() {
    this.headerService.changeHeaderText('Dashboard');
  }

}
