import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../services/header.service';
import { ActivatedRoute } from '@angular/router';
import { GlaciereService } from '../services/glaciere.service';
import { Glaciere } from '../models/glaciere';
import { AsyncPipe, NgClass, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GoogleMap, GoogleMapsModule, MapDirectionsService } from '@angular/google-maps';
import { map, Observable } from 'rxjs';
import { GeocodingService } from '../services/geocoding.service';

@Component({
  selector: 'app-glaciere-unique',
  standalone: true,
  imports: [
    NgClass,
    NgFor,
    FormsModule,
    GoogleMapsModule,
    GoogleMap,
    AsyncPipe
  ],
  templateUrl: './glaciere-unique.component.html',
  styleUrl: './glaciere-unique.component.scss'
})
export class GlaciereUniqueComponent implements OnInit {

  glaciere!: Glaciere | undefined;
  listeGlacieres!: Glaciere[];
  latitude: number = -4.0383;
  longitude: number = 21.7587;
  center: google.maps.LatLngLiteral = { lat: this.latitude, lng: this.longitude }; // Centre de la RDC
  zoom = 5;
  markers: any[] = [];
  directionsResults$: Observable<google.maps.DirectionsResult | undefined> | undefined;

  constructor(
    private route: ActivatedRoute,
    private glaciereService: GlaciereService,
    private headerService: HeaderService,
    private mapDirectionsService: MapDirectionsService,
    private geocodingService: GeocodingService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    
    // Charger la glacière à partir de l'API en utilisant le service
    this.glaciereService.getGlaciereById(id).subscribe(glaciere => {
      this.glaciere = glaciere;
      this.headerService.changeHeaderText('Glacière');
      
      if (this.glaciere) {
        // Mettre à jour la latitude, la longitude et le centre de la carte
        this.latitude = this.glaciere.lat;
        this.longitude = this.glaciere.lon;
        this.center = { lat: this.latitude, lng: this.longitude };

        // Créer un directions request seulement si lat2 et lon2 sont définis
        if (this.glaciere.lat2 !== undefined && this.glaciere.lon2 !== undefined) {
          const request: google.maps.DirectionsRequest = {
            origin: { lat: this.glaciere.lat, lng: this.glaciere.lon },
            destination: { lat: this.glaciere.lat2, lng: this.glaciere.lon2 },
            travelMode: google.maps.TravelMode.DRIVING
          };
          this.directionsResults$ = this.mapDirectionsService.route(request).pipe(map(response => response.result));
        }
      }
    });

    // Initialiser la liste des glacières pour les marqueurs
    this.listeGlacieres = [];
  }

  // Vérifie si la température est dans la plage acceptable
  isTempInRange(): boolean {
    if (this.glaciere?.temp) {
      return this.glaciere?.temp >= 2 && this.glaciere?.temp <= 6;
    }
    return false;
  }

  // Génère les marqueurs pour les glacières
  get glacieres() {
    this.markers = [];

    this.listeGlacieres.forEach(glaciere => {
      this.markers.push({
        position: { lat: glaciere.lat, lng: glaciere.lon },
        label: { color: '#0076ff', text: glaciere.name },
        title: glaciere.name,
        options: { animation: google.maps.Animation.DROP },
      });
    });
    return this.markers;
  }

  // Fonction pour générer un nouveau mot de passe pour la glacière
  OnNewPassWord() {
    /*
    const existingPasswords = this.glaciereService.getGlacieres().map(glaciere => glaciere.password);
    const newPassword = this.glaciereService.generateRandomPassword(existingPasswords)
    //const glaciere = this.glaciereService.getGlaciereById(this.glaciere?.id); // Remplacez par l'ID de la glacière actuelle
    if (this.glaciere) {
      this.glaciere.password = newPassword;
      //this.glaciereService.updateGlaciere(glaciere);
    }
      */

    /*
    if (this.glaciere) {
      const existingPasswords = this.glaciereService.getGlacieres().map(glaciere => glaciere.password);
      const newPassword = this.glaciereService.generateRandomPassword(existingPasswords);
      this.glaciere.password = newPassword;

      // Mettre à jour la glacière avec le nouveau mot de passe
      this.glaciereService.updateGlaciere(this.glaciere._id, { password: newPassword }).subscribe(updatedGlaciere => {
        this.glaciere = updatedGlaciere;
      });
    }
      */

    if (this.glaciere) {
      this.glaciereService.getGlacieres().pipe(
        map(glacieres => glacieres.map(glaciere => glaciere.password))
      ).subscribe(existingPasswords => {
        const newPassword = this.glaciereService.generateRandomPassword(existingPasswords)


        if (this.glaciere) {
          //this.glaciere.password = newPassword
  
          // Mettre à jour la glacière avec le nouveau mot de passe
          this.glaciereService.updateGlaciere(this.glaciere._id, {password: newPassword}).subscribe(updatedGlaciere => {
            this.glaciere = updatedGlaciere
          })
        }

      })
    }
  }

}
