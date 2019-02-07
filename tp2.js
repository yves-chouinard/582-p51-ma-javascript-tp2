/*
  Code JavaScript de la page HTML du TP2 582-P51-MA
  Yves Chouinard | 16628
  Février 2019
*/

window.addEventListener('load', () => {
  var collection = [
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
    }
  ];
  
  construireCollection("#collection", collection);
  
  /*
    Bâtit le DOM de la collection passée en paramètre (un tableau de chansons) sous forme d'un accordéon de genres contenant chacun un accordéon de chansons.
  */
  
  function construireCollection(selecteurCollection, collection) {
    $(selecteurCollection)
      .html('')
      .accordion({ header: "h2" });
    
    for (const chanson of collection) {
      ajouterChanson(selecteurCollection, chanson);
    }
  }
  
  function ajouterChanson(selecteurCollection, chanson) {
    /*
      Sélecteur pour trouver la div du genre où ajouter la chanson :
      #collection div[data-genre='Pop rock']
    */
    
    const selecteurGenre = selecteurCollection + " div[data-genre='" + chanson.genre + "']";

    /*
      Ajout du genre dans l'accordéon de la collection si c'est la première chanson de ce genre. Le texte du titre h2 est le nom du genre, tandis que la div est elle-même un accordéon avec la liste des chansons de ce genre.
    */
    
    if ($(selecteurGenre).length == 0) {
      $(selecteurCollection)
        .append(
          $('<h2>').text(chanson.genre),
          $('<div>')
            .attr('data-genre', chanson.genre)
            .accordion({ header: "h3" })
        )
        .accordion("refresh");
    }
   
    /*
      Ajout de la chanson dans l'accordéon du bon genre
    */
    
    $(selecteurGenre)
      .append(
        $('<h3>').text(chanson.titre + " - " + chanson.artiste),
        $('<div>').append(
          $('<ul>').append(
            $('<li>').text('Titre : ' + chanson.titre),
            $('<li>').text('Durée : ' + chanson.duree),
            $('<li>').text('Album : ' + chanson.album),
            $('<li>').text('Artiste : ' + chanson.artiste),
            $('<li>').text('Genre : ' + chanson.genre),
            $('<li>').text('Date de sortie : ' + chanson.dateSortie),
            $('<li>').text('Pays : ' + chanson.pays)
          )
        )
      )
      .accordion("refresh");
  }  
});