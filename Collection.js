/*
  Classe Collection
*/

export class Collection {
  /*
    Le contructeur fait la requête AJAX pour obtenir toutes les chansons. La fonction afficher() sera appelée à la réception de la réponse. Le paramètre est le sélecteur de l'élément HTML ou afficher la collection.
  */
  
  constructor(selecteur) {
    this.selecteurCollection = selecteur;
    this.lireChansons();
  }

  /*
    Retourne la div contenant la collection sous forme d'élément jQuery.
  */
  
  collection() {
    return $(this.selecteurCollection);
  }
  
  /*
    Affiche le formulaire d'ajout suivi de l'accordéon des genres, celui-ci étant composé des accordéons de chansons de chacun des genres. Les chansons sont disposées dans les bons accordéons.
  */
  
  afficher(chansons) {
    this.collection()
      .empty()
      .append(
        this.creerDivAjoutChanson(),
        this.creerAccordeonGenres()
      );
    
    for (const chanson of chansons) {
      this.insererChanson(chanson);
    }
  }

  /*
    Crée la division contenant le bouton et le formulaire d'ajout de chanson. Le bouton d'ajout est dans une sous-div "boutons". Il vide le formulaire d'ajout et le fait apparaitre. Le formulaire d'ajout est le même que le formulaire de modification, mais avec un id de chanson nul.
  */
  
  creerDivAjoutChanson() {
    return $('<div class="ajout-chanson">')
      .append(
        /* Div boutons */
        $('<div class="boutons">')
          .append(
            /* Bouton ajouter chanson */
            $('<button class="ajouter">')
              .text('Ajouter')
              .click(() => {
                /* Vider et faire apparaitre le formulaire d'ajout */
                this.formDetailsChanson(0)
                  .show()
                  .find('input:not([type="hidden"])').val('')
              })
          ),
        /* Formulaire d'ajout de chanson, caché à la création */
        this.creerFormDetailsChanson(0)
      );
  }
  
  /*
    Crée l'accordéon jQuery des genres. Il est vide lors de sa création. Les genres y sont ajoutés au fur et à mesure qu'on y ajoute les chansons.
  */
  
  creerAccordeonGenres() {
    return $('<div class="accordeon-genres">')
      .accordion({
        header: "h2",
        heightStyle: "content",
        collapsible: true,
        active: false
      });
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
        $('<h2>')
          .text(genre)
          .attr('data-genre', genre),
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
      .accordion({
        header: "h3", 
        heightStyle: "content",
        collapsible: true,
        active: false
      });
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
    Ajoute une chanson dans le bon accordéon de chansons selon le genre de la chanson. Ajoute le genre dans l'accordéon des genres s'il s'agit de la première chanson de ce genre.
  */
  
  insererChanson(chanson) {
    if (this.chansonPresente(chanson)) {
      this.retirerChanson(chanson);
    }
    
    if (!this.genrePresent(chanson.genre)) {
      this.insererGenre(chanson.genre);
    }
    
    this.accordeonChansons(chanson.genre)
      .append(
        $('<h3>')
          .text(chanson.titre + " - " + chanson.artiste)
          .attr('data-id', chanson.id),
        this.creerDivDetailsChanson(chanson)
      )
      .accordion("refresh");
  }  

  /*
    Vérifie si une chanson est présente dans l'accordéon. Retourne true ou false.
  */
  
  chansonPresente(chanson) {
    return $('[data-id="' + chanson.id + '"]').length;
  }
  
  /*
    Retire une chanson de l'accordéon. Retire aussi le genre de l'accordéon s'il s'agissait de la dernière chanson de ce genre.
  */
  
  retirerChanson(chanson) {
    $('[data-id="' + chanson.id + '"]').remove();
    this.accordeonChansons(chanson.genre).accordion("refresh");
    
    if (this.accordeonChansons(chanson.genre).children().length == 0) {
      $('[data-genre="' + chanson.genre + '"]').remove();
      this.accordeonGenres().accordion("refresh");
    }
  }
  
  /*
    La div des détails d'une chanson contient la liste des attributs de la chanson et une div boutons avec le bouton modifier et le bouton supprimer.
  */
  
  creerDivDetailsChanson(chanson) {
    return $('<div class="details-chanson">')
      .attr('data-id', chanson.id)
      .append(
        /* Détails de la chanson */
        $('<ul>').append(
          $('<li>').text('Titre : ' + chanson.titre),
          $('<li>').text('Durée : ' + chanson.duree),
          $('<li>').text('Album : ' + chanson.album),
          $('<li>').text('Artiste : ' + chanson.artiste),
          $('<li>').text('Genre : ' + chanson.genre),
          $('<li>').text('Date de sortie : ' + chanson.dateSortie),
          $('<li>').text('Pays : ' + chanson.pays)
        ),
        /* Div boutons */
        $('<div class="boutons">').append(
          /* Bouton modifier */
          $('<button class="modifier">')
            .text('Modifier')
            .click(() => {
              /* Remplir et montrer le formulaire de modification */
              let form = this.formDetailsChanson(chanson.id);
              form.show();
              form.find('input[name="titre"]').val(chanson.titre);
              form.find('input[name="duree"]').val(chanson.duree);
              form.find('input[name="album"]').val(chanson.album);
              form.find('input[name="artiste"]').val(chanson.artiste);
              form.find('input[name="genre"]').val(chanson.genre);
              form.find('input[name="dateSortie"]').val(chanson.dateSortie);
              form.find('input[name="pays"]').val(chanson.pays);
            }),
          /* Bouton supprimer */
          $('<button class="supprimer">')
            .text('Supprimer')
            .click(() => {
              this.supprimerChanson(chanson);
            })
        ),
        /* Formulaire de modification, caché à la création */
        this.creerFormDetailsChanson(chanson.id)
      );
  }
  
  /*
    Formulaire permettant de modifier les détails de la chanson dont l'id est passé en paramètre. Un id de zéro signifie qu'il s'agit de l'ajout d'une nouvelle chansons. La soumission entraine une requête AJAX d'enregistrement de la chanson.
  */
  
  creerFormDetailsChanson(idChanson) {
    return $('<form class="details-chanson">')
      .attr('data-id', idChanson)
      .hide()
      .append(
        $('<input type="hidden" name="id">').val(idChanson),
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
                $('<input type="text" name="dateSortie" required>')
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
        let form = this.formDetailsChanson(idChanson);      
        let chanson = {};
      
        for (const paire of form.serializeArray()) {
          chanson[paire.name] = paire.value;
        }
      
        this.enregistrerChanson(chanson);      
        form.hide();
        event.preventDefault();
      });
  }
  
  /*
    Retourne le formulaire de modification de la chanson dont l'id est passé en paramètre. Un id de chanson de zéro correspond au formulaire d'ajout.
  */
  
  formDetailsChanson(idChanson) {
    return $('form.details-chanson[data-id="' + idChanson + '"]');
  }
  
  /*
    Envoie la requête AJAX pour lire toutes les chansons de la BD. Affiche la collection à la réception de la réponse.
  */
  
  lireChansons() {
    var self = this;
    
    $.ajax({
        url: 'collection.php',
        type: 'GET',
        dataType: 'json',
        success: function(chansons) {
          self.afficher(chansons);
        }
    });
  }
  
  /*
    Envoie la requête AJAX pour l'enregistrement d'une chanson dans la DB. Si l'id de la chanson est nul, il s'agit d'un ajout; sinon c'est une modification. La chanson est ajoutée ou mise à jour dans l'accordéon à la réception de la réponse.
  */
  
  enregistrerChanson(chanson) {
    var self = this;
    
    $.ajax({
        url: 'collection.php',
        type: 'POST',
        data: JSON.stringify(chanson),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function(chanson) {
          self.insererChanson(chanson);
        }
    });
  }

  /*
    Envoie la requête AJAX pour supprimer une chanson. Retire la chanson de l'accordéon à la réception de la réponse.
  */
  
  supprimerChanson(chanson) {
    var self = this;
    
    $.ajax({
        url: 'collection.php',
        type: 'DELETE',
        data: 'id=' + chanson.id,
        dataType: 'json',
        success: function(chansons) {
          self.retirerChanson(chanson);
        }
    });
  }
}