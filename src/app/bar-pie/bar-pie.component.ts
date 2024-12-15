import { Component } from '@angular/core';
import { SharedModule } from '../bar-chart/sharedModule';
import { Campus } from '../models/campus';
import { CampusService } from '../services/campus.service';

@Component({
  selector: 'app-bar-pie',
  standalone: true,
  imports: [
    SharedModule
  ],
  templateUrl: './bar-pie.component.html',
  styleUrl: './bar-pie.component.scss'
})
export class BarPieComponent {
  listCampus!: Campus[];
  
  chartOptions: any;

  constructor(
    private campusService: CampusService
  ) {}

  ngOnInit(): void {
    this.listCampus = this.campusService.getCampuses(); // Chargez les données
    this.initChart();
  }

  initChart() {
    const colors = [
      '#5474c3', '#fbcb5d', '#79c5d8', '#94cc74', 
      '#ec94d0', '#ee6961', '#3ca474', '#9d6cb7', 
      '#9cd27c'
    ];


    this.chartOptions = {
      title: {
        //text: 'Nightingale Chart',
        //subtext: 'Fake Data',
        left: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      legend: {
        left: 'center',
        top: 'bottom',
        data: this.listCampus.map(campus => campus.name)
      },
      toolbox: {
        show: false,
        feature: {
          mark: { show: true },
          dataView: { show: true, readOnly: false },
          restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      series: [
        {
          name: 'Scores des campus',
          type: 'pie',
          radius: [20, 120],
          center: ['50%', '50%'],
          roseType: 'radius',
          itemStyle: {
            borderRadius: 5,
            color: (params: any) => colors[params.dataIndex % colors.length] // Couleurs uniques
          },
          label: {
            show: false
          },
          emphasis: {
            label: {
              //show: true
            }
          },
          data: this.listCampus.map(campus => ({
          value: campus.score,
          name: campus.location
        }))
        }
      ]
    };
    
    
    
  }


}
