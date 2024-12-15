export class Campus {
  constructor(
    public id: string,                             // Identifiant unique
    public name: string,                           // Nom du campus
    public location: string,                       // Localisation
    public votes: number = 0,                      // Total des votes
    public description?: string,                   // Description facultative
    public status?: string,                        // Statut du campus (actif/inactif)
    public voters?: {                              // Votes par utilisateur et critère
      [userId: string]: { [criteria: string]: number };
    },
    public group?: string,                         // Groupe auquel appartient le campus (A, B ou C)
    public score?: number                         // Score global (optionnel)
  ) {}
}
