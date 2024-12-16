import { Component, NgModule } from '@angular/core';
import { HeaderService } from '../services/header.service';
import { CampusService } from '../services/campus.service';
import { ActivatedRoute } from '@angular/router';
import { Campus } from '../models/campus';
import { NgClass, NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-campus-unique',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    MatSliderModule,
    TitleCasePipe,
    NgClass,
    FormsModule
  ],
  templateUrl: './campus-unique.component.html',
  styleUrl: './campus-unique.component.scss'
})
export class CampusUniqueComponent {

  campus!: Campus | undefined
  backgroundImage!: string;
  image!: string;

  slider1Value: number = 5;
  slider2Value: number = 5;
  slider3Value: number = 5;
  slider4Value: number = 5;
  slider5Value: number = 5;
  slider6Value: number = 5;
  slider7Value: number = 5;

  userId:string = "user1"



  constructor(
    private route: ActivatedRoute,
    private headerService: HeaderService,
    private campusService: CampusService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.campus = this.campusService.getCampusById(id)
    this.headerService.changeHeaderText(`${this.campus?.name}`);
    
    const name = this.campus?.name
    if (name?.toLocaleLowerCase().includes('gps')) {
      this.setBackgroundImage('campus_gps.jpg');
      this.image = 'campus_gps.jpg'
    } else if (name?.toLocaleLowerCase().includes('lille')) {
      this.setBackgroundImage('campus_lille.jpg');
      this.image = 'campus_lille.jpg'
    } else if (name?.toLocaleLowerCase().includes('manila')) {
      this.setBackgroundImage('campus_manila.png');
      this.image = 'campus_manila.png'
    } else if (name?.toLocaleLowerCase().includes('nantes')) {
      this.setBackgroundImage('campus_nantes.jpg');
      this.image = 'campus_nantes.jpg'
    } else if (name?.toLocaleLowerCase().includes('toulouse')) {
      this.setBackgroundImage('campus_toulouse.jpg');
      this.image = 'campus_toulouse.jpg'
    } else if (name?.toLocaleLowerCase().includes('douala')) {
      this.setBackgroundImage('campus_douala.jpg');
      this.image = 'campus_douala.jpg'
    } else if (name?.toLocaleLowerCase().includes('quito')) {
      this.setBackgroundImage('campus_quito.jpg');
      this.image = 'campus_quito.jpg'
    } else if (name?.toLocaleLowerCase().includes('cochin')) {
      this.setBackgroundImage('campus_cochin.jpg');
      this.image = 'campus_cochin.jpg'
    }
    
  }

  setBackgroundImage(imageUrl: string) {
    this.backgroundImage = `url(${imageUrl})`;
  }

  OnSubmit() {
    if (this.campus) {
      this.campusService.addOrUpdateVote( this.campus.id, this.userId, 'math', this.slider1Value)
    }
  }

  getClassForValue(value: number): string {
     if (value >= 7.5) {
      return 'good'; 
    } else if (value >= 5) {
       return 'average'; 
      } else { 
        return 'bad'; 
      } 
    }

}
