/*
  Classe Collection
*/

export class Collection {
  constructor(selecteur) {
    this.selecteurCollection = selecteur;
    this.chansons = [];
  }

  collection() {
    return $(this.selecteurCollection);
  }
  
  /*
    Affiche le formulaire d'ajout suivi de l'accordéon des genres, celui-ci étant composé des accordéons de chansons de chacun des genres. Les chansons sont disposées dans les bons accordéons.
  */
  
  afficher() {
    this.collection()
      .empty()
      .append(
        this.creerDivAjoutChanson(),
        this.creerAccordeonGenres()
      );
    
    for (const chanson of this.chansons) {
      if (!this.genrePresent(chanson.genre)) {
        this.insererGenre(chanson.genre);
      }
      
      this.insererChanson(chanson);
    }
  }

  /*
    Crée la division contenant le bouton et le formulaire d'ajout de chanson. Le bouton d'ajout est dans une sous-div "boutons". Le formulaire d'ajout est le même que le formulaire de modification, mais avec un id de chanson nul.
  */
  
  creerDivAjoutChanson() {
    return $('<div class="ajout-chanson">')
      .append(
        $('<div class="boutons">').append(this.creerBoutonAjouter()),
        this.creerFormAjoutChanson()
      );
  }
  
  /*
    Crée l'accordéon jQuery des genres. Il est vide lors de sa création. Les genres y sont ajoutés au fur et à mesure qu'on y ajoute les chansons.
  */
  
  creerAccordeonGenres() {
    return $('<div class="accordeon-genres">')
      .accordion({ header: "h2", heightStyle: "content" });
  }
  
  /*
    Retourne l'accordéon des genres en tant qu'élément jQuery.
  */
  
  accordeonGenres() {
    return this.collection().find('.accordeon-genres');
  }
  
  /*
    Ajoute un genre dans l'accordéon. Le paramètre est le nom du genre en texte.
  */
  
  insererGenre(genre) {
    this.accordeonGenres()
      .append(
        $('<h2>').text(genre),
        this.creerAccordeonChansons(genre)
      )
      .accordion("refresh");    
  }
  
  /*
    Vérifie si un genre est présent dans l'accordéon. Le paramètre est le nom du genre en texte. Retourne true ou false.
  */
  
  genrePresent(genre) {
    return this.accordeonChansons(genre).length;
  }
  
  /*
    Crée un accordéon de chansons pour un genre donné. Le paramètre est le nom du genre en texte. L'accordéon est vide lors de sa création. On y ajoute les chansons par la suite.
  */
  
  creerAccordeonChansons(genre) {
    return $('<div class="accordeon-chansons">')
      .attr('data-genre', genre)
      .accordion({ header: "h3", heightStyle: "content" });
  }

  /*
    Retourne l'accordéon de chansons d'un genre donné en tant qu'élément jQuery. Le paramètre est le nom du genre en texte.
  */
  
  accordeonChansons(genre) {
    return this.accordeonGenres().find(
      '.accordeon-chansons[data-genre="' + genre + '"]'
    );
  }
  
  /*
    Ajoute une chanson dans le bon accordéon de chansons selon le genre de la chanson.
  */
  
  insererChanson(chanson) {
    this.accordeonChansons(chanson.genre)
      .append(
        $('<h3>').text(chanson.titre + " - " + chanson.artiste),
        this.creerDivDetailsChanson(chanson)
      )
      .accordion("refresh");
  }  

  /*
    La div des détails d'une chanson contient la liste des attributs de la chanson et une div boutons avec le bouton modifier et le bouton supprimer.
  */
  
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
        $('<div class="boutons">').append(
          this.creerBoutonModifier(chanson.id),
          this.creerBoutonSupprimer(chanson.id)
        )
      );
  }
  
  /*
    Formulaire permettant de modifier les détails de la chanson dont l'id est passé en paramètre. Un id de zéro signifie qu'il s'agit de l'ajout d'une nouvelle chansons.
  */
  
  creerFormDetailsChanson(idChanson) {
    return $('<form class="details-chanson">')
      .attr('data-id', idChanson)
      .hide()
      .append(
        $('<fieldset>')
          .append(
            $('<legend>').text("Détails de la chanson"),
            $('<p>')
              .append(
                $('<label>').text("Titre"),
                $('<input type="text" name="titre" required>')
              ),
            $('<p>')
              .append(
                $('<label>').text("Durée"),
                $('<input type="text" name="duree" required>')
              ),
            $('<p>')
              .append(
                $('<label>').text("Album"),
                $('<input type="text" name="album" required>')
              ),
            $('<p>')
              .append(
                $('<label>').text("Artiste"),
                $('<input type="text" name="artiste" required>')
              ),
            $('<p>')
              .append(
                $('<label>').text("Genre"),
                $('<input type="text" name="genre" required>')
              ),
            $('<p>')
              .append(
                $('<label>').text("Date de sortie"),
                $('<input type="date" name="date-sortie" required>')
              ),
            $('<p>')
              .append(
                $('<label>').text("Pays"),
                $('<input type="text" name="pays" required>')
              ),
            $('<div class="boutons">')
              .append(
                $('<button type="button">')
                  .text("Annuler")
                  .click(() => {
                    this.formDetailsChanson(idChanson).hide();
                  }),
                $('<button type="submit">')
                  .text("Enregistrer")
              )
          )
      )
      .submit(event => {
        let form = this.formDetailsChanson(idChanson).hide();
        let chanson = {};
      
        $.ajax({
            url: 'collection.php',
            type: 'POST',
            data: form.serialize(),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function(msg) {
            }
        });
//        chanson.id = Number(form.attr('data-id'));
//        chanson.titre = form.find('input[name="titre"]').val();
//        chanson.duree = form.find('input[name="duree"]').val();
//        chanson.album = form.find('input[name="album"]').val();
//        chanson.artiste = form.find('input[name="artiste"]').val();
//        chanson.genre = form.find('input[name="genre"]').val();
//        chanson.dateSortie = form.find('input[name="date-sortie"]').val();
//        chanson.pays = form.find('input[name="pays"]').val();
//
//        this.enregistrerChanson(chanson); // Ajout dans la BD
        this.insererChanson(chanson); // Ajout dans l'accordéon
      
        event.preventDefault();
      });
  }
  
  creerFormAjoutChanson() {
    return this.creerFormDetailsChanson(0);
  }
  
  /*
    Retourne le formulaire de modification de la chanson dont l'id est passé en paramètre. Un id de chanson de zéro correspond au formulaire d'ajout.
  */
  
  formDetailsChanson(idChanson) {
    return $('form.details-chanson[data-id="' + idChanson + '"]');
  }
  
  formAjoutChanson() {
    return this.formDetailsChanson(0);
  }
  
  /*
    Le bouton Ajouter vide les champs du formulaire d'ajout de chanson et le fait apparaitre.
  */
  
  creerBoutonAjouter() {
    return $('<button>')
      .text('Ajouter')
      .click(() => {
        this.formAjoutChanson()
          .show()
          .find('input').val('')
      });
  }
  
  creerBoutonModifier(idChanson) {
    return $('<button>')
      .text('Modifier')
      .click(() => {
          alert("Modifier chanson " + idChanson);
      });
  }
  
  creerBoutonSupprimer(idChanson) {
    return $('<button>')
      .text('Supprimer')
      .click(() => {
          alert("Supprimer chanson " + idChanson);
      });
  }
  
  lireChansons() {
//    this.chansons = [
//      {
//        id: 1,
//        titre: "Tom Sawyer",
//        duree: "4:34",
//        album: "Moving Pictures",
//        artiste: "Rush",
//        genre: "Rock",
//        dateSortie: "1981-02-12",
//        pays: "Canada"
//      },
//      {
//        id: 2,
//        titre: "Where the Streets Have No Name",
//        duree: "5:38",
//        album: "The Joshua Tree",
//        artiste: "U2",
//        genre: "Rock",
//        dateSortie: "1987-03-09",
//        pays: "Irlande"
//      },
//      {
//        id: 3,
//        titre: "Hey Jude",
//        duree: "7:11",
//        album: "Hey Jude",
//        artiste: "The Beatles",
//        genre: "Pop rock",
//        dateSortie: "1968-08-26",
//        pays: "Angleterre"
//      },
//      {
//        id: 4,
//        titre: "Hey Jude",
//        duree: "7:11",
//        album: "Hey Jude",
//        artiste: "The Beatles",
//        genre: "Pop rock",
//        dateSortie: "1968-08-26",
//        pays: "Angleterre"
//      }
//    ];
  
    $.ajax({
        url: 'collection.php',
        type: 'GET',
        data: '',
        dataType: 'json',
        async: false,
        success: function(msg) {
        }
    });
    
    console.log(this.chansons);
    return this.chansons;
  }
  
  enregistrerChanson(chanson) {
    $.ajax({
        url: 'collection.php',
        type: 'POST',
        data: JSON.stringify(chanson),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function(msg) {
        }
    });

    return this.chansons;
  }
}