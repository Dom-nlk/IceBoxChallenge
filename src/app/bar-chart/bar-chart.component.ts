import { Component, OnInit } from '@angular/core';
import { SharedModule } from './sharedModule';
import { Campus } from '../models/campus';
import { CampusService } from '../services/campus.service';

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [
    SharedModule
  ],
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.scss'
})
export class BarChartComponent implements OnInit {

  chartOptions: any;
  campus!: Campus
  listCampus!: Campus[]

  constructor(
    private campusService: CampusService
  ) {

  }

  ngOnInit(): void {
    this.listCampus = this.campusService.getCampuses()
    this.initChart();

  }

  initChart() {
    // const colors = ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf', '#1f77b4', '#ff7f0e'];
    const colors = [
      '#5474c3', '#fbcb5d', '#79c5d8', '#94cc74', 
      '#ec94d0', '#ee6961', '#3ca474', '#9d6cb7', 
      '#9cd27c'
    ];

    this.chartOptions = {
      xAxis: {
        type: 'category',
        data: this.listCampus.map(campus => campus.location),
        axisLabel: {
          rotate: 45, // Incline les noms de 90° pour les rendre verticaux
          interval: 0, // Affiche toutes les étiquettes
          fontSize: 10 // Ajuste la taille du texte si nécessaire
        }
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: this.listCampus.map(campus => campus.score),
          type: 'bar',
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(180, 180, 180, 0.2)'
          },
          itemStyle: {
            /*color: (params: any) => {
              return colors[params.dataIndex % colors.length];
            }*/
           color: (params: any) => colors[params.dataIndex % colors.length]
          }
        }
      ]
    };
  }

}
