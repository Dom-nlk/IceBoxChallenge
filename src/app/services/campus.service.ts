import { Injectable } from "@angular/core";
import { Campus } from "../models/campus";

@Injectable({
    providedIn: 'root'
})

export class CampusService {
  private campuses: Campus[] = [
    // Group A
    new Campus('1', 'Campus Manila', 'Manila', 0, 'Un campus vibrant en Asie', 'actif', {}, 'A', 82),
    new Campus('2', 'Campus Lille', 'Lille', 0, 'Un campus dynamique au carrefour de l’Europe', 'actif', {}, 'A', 70),
    new Campus('3', 'Campus Paris GPS', 'Paris', 0, 'Un campus moderne situé au cœur de la capitale française', 'actif', {}, 'A', 92),
  
    // Group B
    new Campus('4', 'Campus Toulouse', 'Toulouse', 0, 'Un campus spécialisé dans l’aéronautique et les sciences', 'actif', {}, 'B', 98),
    new Campus('5', 'Campus Douala', 'Douala', 0, 'Un campus innovant en Afrique', 'actif', {}, 'B', 70),
    new Campus('6', 'Campus Cochin', 'Cochin', 0, 'Un campus riche en diversité culturelle', 'actif', {}, 'B', 95),
  
    // Group C
    new Campus('7', 'Campus Nantes', 'Nantes', 0, 'Un campus dans une ville verte et culturelle', 'actif', {}, 'C', 84),
    new Campus('8', 'Campus Recife', 'Recife', 0, 'Un campus vibrant en Amérique du Sud', 'actif', {}, 'C', 86),
    new Campus('9', 'Campus Quito', 'Quito', 0, 'Un campus situé au cœur des Andes', 'actif', {}, 'C', 68),
  ];
  
      
  // Récupérer tous les campus
  getCampuses(): Campus[] {
    return this.campuses;
  }

  // Récupérer un campus par ID
  getCampusById(id: string): Campus | undefined {
    return this.campuses.find((campus) => campus.id === id);
  }

  // Vérifie si un utilisateur a déjà voté
  hasVoted(campusId: string, userId: string): boolean {
    const campus = this.getCampusById(campusId);
    if (!campus || !campus.voters) return false;
    return !!campus.voters[userId]; // Retourne vrai si l'utilisateur a voté
  }

  // Ajouter ou mettre à jour des notes
  addOrUpdateVote(
    campusId: string,
    userId: string,
    subject: string,
    score: number
  ): string {
    const campus = this.getCampusById(campusId);
    if (!campus) {
      return 'Campus not found';
    }

    if (score < 0 || score > 10) {
      return 'Invalid score';
    }

    // Initialiser voters si nécessaire
    if (!campus.voters) {
      campus.voters = {};
    }

    // Ajouter ou mettre à jour les notes
    if (!campus.voters[userId]) {
      campus.voters[userId] = {};
      campus.votes++; // Incrémenter le nombre total de votants
    }

    campus.voters[userId][subject] = score; // Ajouter ou mettre à jour la note
    return `Vote for ${subject} by ${userId} has been recorded/updated successfully.`;
  }
}
