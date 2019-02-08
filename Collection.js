/*
  Classe Collection
*/

export class Collection {
  constructor(selecteur) {
    this.selecteurCollection = selecteur;
    this.chansons = [];
  }

  /*
    Affiche le formulaire d'ajout suivi de l'accordéon des genres, celui-ci étant composé des accordéons de chansons de chacun des genres. Les chansons sont disposées dans les bons accordéons.
  */
  
  afficher() {
    $(this.selecteurCollection)
      .html('')
      .append(
        this.creerDivAjout(),
        this.creerAccordeonGenres()
      );
    
    for (const chanson of this.chansons) {
      if (!this.genrePresent(chanson.genre)) {
        this.insererGenre(chanson.genre);
      }
      
      this.insererChanson(chanson);
    }
  }

  genrePresent(genre) {
    return $(this.selecteurAccordeonChansons(genre)).length > 0;
  }
  
  /*
    Ajoute une chanson dans le bon accordéon de chansons selon le genre de la chanson. S'il s'agit de la première chanson de ce genre, ajoute préalablement le genre dans l'accordéon des genres.
  */
  
  afficherChanson(chanson) {
    /* Ajout du genre dans l'accordéon des genres si nécessaire */
    if ($(this.selecteurAccordeonChansons(chanson.genre)).length == 0) {
      $(this.selecteurAccordeonGenres())
        .append(
          $('<h2>').text(chanson.genre),
          this.creerAccordeonChansons(chanson.genre)
        )
        .accordion("refresh");
    }
   
    /* Ajout de la chanson dans l'accordéon de chansons du bon genre */
    $(this.selecteurAccordeonChansons(chanson.genre))
      .append(
        $('<h3>').text(chanson.titre + " - " + chanson.artiste),
        this.creerDivDetailsChanson(chanson)
      )
      .accordion("refresh");
  }  

  creerDivAjout() {
    return $('<div>').append(
      $('<div class="boutons">').append(
        this.creerBoutonAjouter()
      )
    );
  }
  
  creerAccordeonGenres() {
    return $('<div class="accordeon-genres">')
      .accordion({ header: "h2", heightStyle: "content" });
  }
  
  creerAccordeonChansons(genre) {
    return $('<div class="accordeon-chansons">')
      .attr('data-genre', genre)
      .accordion({ header: "h3", heightStyle: "content" });
  }

  creerDivDetailsChanson(chanson) {
    return $('<div class="details-chanson">')
      .append(
        $('<ul>').append(
          $('<li>').text('Titre : ' + chanson.titre),
          $('<li>').text('Durée : ' + chanson.duree),
          $('<li>').text('Album : ' + chanson.album),
          $('<li>').text('Artiste : ' + chanson.artiste),
          $('<li>').text('Genre : ' + chanson.genre),
          $('<li>').text('Date de sortie : ' + chanson.dateSortie),
          $('<li>').text('Pays : ' + chanson.pays)
        ),
        $('<div class="boutons>').append(
          this.creerBoutonModifier(chanson.id),
          this.creerBoutonSupprimer(chanson.id)
        )
      );
  }
  
  creerBoutonAjouter() {
    return $('<button>')
      .text('Ajouter')
      .on('click', () => {
          alert("Ajouter");
      });
  }
  
  creerBoutonModifier(idChanson) {
    return $('<button>')
      .text('Modifier')
      .on('click', () => {
          alert("Modifier chanson " + idChanson);
      });
  }
  
  creerBoutonSupprimer(idChanson) {
    return $('<button>')
      .text('Supprimer')
      .on('click', () => {
          alert("Supprimer chanson " + idChanson);
      });
  }
  
  selecteurAccordeonGenres() {
    return this.selecteurCollection + " div.accordeon-genres";
  }
  
  selecteurAccordeonChansons(genre) {
    return (
      this.selecteurAccordeonGenres() +
      " div[data-genre='" + genre + "']"
    );
  }
  
  lireChansons() {
    this.chansons = [
      {
        id: 1,
        titre: "Tom Sawyer",
        duree: "4:34",
        album: "Moving Pictures",
        artiste: "Rush",
        genre: "Rock",
        dateSortie: "1981-02-12",
        pays: "Canada"
      },
      {
        id: 2,
        titre: "Where the Streets Have No Name",
        duree: "5:38",
        album: "The Joshua Tree",
        artiste: "U2",
        genre: "Rock",
        dateSortie: "1987-03-09",
        pays: "Irlande"
      },
      {
        id: 3,
        titre: "Hey Jude",
        duree: "7:11",
        album: "Hey Jude",
        artiste: "The Beatles",
        genre: "Pop rock",
        dateSortie: "1968-08-26",
        pays: "Angleterre"
      },
      {
        id: 4,
        titre: "Hey Jude",
        duree: "7:11",
        album: "Hey Jude",
        artiste: "The Beatles",
        genre: "Pop rock",
        dateSortie: "1968-08-26",
        pays: "Angleterre"
      }
    ];
  
    return this.chansons;
  }
}