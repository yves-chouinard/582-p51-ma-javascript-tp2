<?php

/*
  Service JSON effectuant les opération CRUD pour la collection de chansons :
  
  GET sans 'id' - détails de toutes les chansons
  GET avec 'id' - détails d'une chanson en particulier
  POST - ajout ('id' == 0) ou modification d'une chanson
  DELETE - suppression d'une chanson en particulier
*/

switch ($_SERVER['REQUEST_METHOD']) {
  case 'GET':
    if (empty($_GET[''id''])) {
      echo json_encode(lireChansons());
    }
    else {
      echo json_encode(lireChanson($_GET[''id'']))
    }
    
    break;
  
  case 'POST':
    $json = file_get_contents("php://input");
    $chanson = json_decode($json);
    enregistrerChanson($chanson);
    echo "{}";
    break;
    
  case 'DELETE':
    supprimerChanson($_GET[''id'']);
    echo "{}";
    break;
}

/*
  Lit toutes les chansons dans la BD et les retourne sous la forme d'un tableau d'objets.
*/

function lireChansons() {
  return [
    (object) [
      'id' => 1,
      'titre' => "Tom Sawyer",
      'duree' => "4:34",
      'album' => "Moving Pictures",
      'artiste' => "Rush",
      'genre' => "Rock",
      'dateSortie' => "1981-02-12",
      'pays' => "Canada"
    ],
    (object) [
      'id' => 2,
      'titre' => "Where the Streets Have No Name",
      'duree' => "5:38",
      'album' => "The Joshua Tree",
      'artiste' => "U2",
      'genre' => "Rock",
      'dateSortie' => "1987-03-09",
      'pays' => "Irlande"
    ],
    (object) [
      'id' => 3,
      'titre' => "Hey Jude",
      'duree' => "7:11",
      'album' => "Hey Jude",
      'artiste' => "The Beatles",
      'genre' => "Pop rock",
      'dateSortie' => "1968-08-26",
      'pays' => "Angleterre"
    ],
    (object) [
      'id' => 4,
      'titre' => "Hey Jude",
      'duree' => "7:11",
      'album' => "Hey Jude",
      'artiste' => "The Beatles",
      'genre' => "Pop rock",
      'dateSortie' => "1968-08-26",
      'pays' => "Angleterre"
    ]
  ];
}

/*
  Lit dans la BD les détails d'une chanson selon son 'id' et les retourne sous la forme d'un objet.
*/

function lireChanson($'id') {
  return {};
}

/*
  Enregistre dans la BD les détails d'une chanson selon son 'id'. Si l''id' est nul ou non spécifié, il s'agit d'un ajout.
*/

function enregistrerChanson($chanson) {
}

/*
  Supprime dans la BD une chanson spécifiée par son 'id'.
*/

function supprimerChanson($'id') {
  
}