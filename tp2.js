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
    /* Ajout de chacune des chansons à la div de la collection */
    for (const chanson of collection) {
      ajouterChanson(selecteurCollection, chanson);
    }
    
    /* Présentation en accordéons jQuery */
    $(selecteurCollection).accordion({ header: "h2" });  
    $(".chansons").accordion({ header: "h3" });
  }
  
  function ajouterChanson(selecteurCollection, chanson) {
    /*
      On trouve la div du genre où ajouter la chanson, ou encore on la crée s'il s'agit de la première chanson de ce genre.
    */
    
    const selecteurGenre = selecteurCollection + " [data-genre='" + chanson.genre + "']";

    if ($(selecteurGenre).length == 0) {
      ajouterGenre(selecteurCollection, chanson.genre);
    }
    
    /* Titre et artiste de la chanson dans le h3 */
    const h3 = document.createElement('h3');
    const texte = chanson.titre + " - " + chanson.artiste;
    h3.appendChild(document.createTextNode(texte));

    /* Détails de la chanson dans la div, vide pour l'instant */
    const divChanson = document.createElement('div');

    /* Ajout du h3 et de la div à l'accordéon */
    divGenre.appendChild(h3);
    divGenre.appendChild(divChanson);
  }
  
  function trouverGenre(divCollection, genre) {
    return divCollection.querySelector("[data-genre='" + genre + "']");
  }
  
  /*
    Ajout d'un genre dans les divs accordéons correspondant au sélecteur passé en paramètre. Le paramètre genre est le nom du genre en texte.
  */
  
  function ajouterGenre(selecteurCollection, genre) {
    /* Nom du genre dans le h2 */
    const h2 = document.createElement('h2');
    h2.appendChild(document.createTextNode(genre));

    /* Liste des chansons dans la div, vide pour l'instant */
    const divGenre = document.createElement('div');
    divGenre.dataset.genre = genre;

    /* Ajout du h2 et de la div à l'accordéon */
    divCollection.appendChild(h2);   
    divCollection.appendChild(divGenre);
    
    return divGenre;
  }
});