<?php

/*
  Accès aux données de la collection de chansons
  
  CREATE TABLE chansons (
    id int unsigned PRIMARY KEY AUTO_INCREMENT,
    titre varchar(255) NOT NULL,
    duree varchar(50) NOT NULL,
    album varchar(255) NOT NULL,
    artiste varchar(255) NOT NULL,
    genre varchar(100) NOT NULL,
    dateSortie varchar(50) NOT NULL,
    pays varchar(100) NOT NULL
  )
*/

class Chanson {
  public $id;
  public $titre;
  public $duree;
  public $album;
  public $artiste;
  public $genre;
  public $dateSortie;
  public $pays;
}

class ModeleCollection {
  protected $pdo;
  
  function __construct() {
    $this->pdo = new PDO(
      'mysql:host=localhost;dbname=collection', "root", "root"
    );
    
    $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $this->pdo->exec("SET NAMES 'utf8'");
  }
  
  /*
    Lit toutes les chansons dans la BD et les retourne sous la forme d'un tableau d'objets.
  */

  function lireChansons() {
    $sql = "SELECT * FROM chansons";
    $stmt = $this->pdo->prepare($sql);
    $stmt->execute();

    $chansons = $stmt->fetchAll(PDO::FETCH_CLASS, "Chanson");
    
    return $chansons;
  }
  
//  function lireChansons() {
//    return [
//      (object) [
//        'id' => 1,
//        'titre' => "Tom Sawyer",
//        'duree' => "4:34",
//        'album' => "Moving Pictures",
//        'artiste' => "Rush",
//        'genre' => "Rock",
//        'dateSortie' => "1981-02-12",
//        'pays' => "Canada"
//      ],
//      (object) [
//        'id' => 2,
//        'titre' => "Where the Streets Have No Name",
//        'duree' => "5:38",
//        'album' => "The Joshua Tree",
//        'artiste' => "U2",
//        'genre' => "Rock",
//        'dateSortie' => "1987-03-09",
//        'pays' => "Irlande"
//      ],
//      (object) [
//        'id' => 3,
//        'titre' => "Hey Jude",
//        'duree' => "7:11",
//        'album' => "Hey Jude",
//        'artiste' => "The Beatles",
//        'genre' => "Pop rock",
//        'dateSortie' => "1968-08-26",
//        'pays' => "Angleterre"
//      ]
//    ];
//  }

  /*
    Lit dans la BD les détails d'une chanson selon son 'id' et les retourne sous la forme d'un objet.
  */

  function lireChanson($id) {
    return (object) [];
  }

  /*
    Enregistre dans la BD les détails d'une chanson selon son 'id'. Si l''id' est nul ou non spécifié, il s'agit d'un ajout.
  */

  function enregistrerChanson($chanson) {
    if ($chanson->id) {
      /* Mise à jour */
      $sql = "
        UPDATE chansons
        SET titre = ?, duree = ?, album = ?, artiste = ?,
        genre = ?, dateSortie = ?, pays = ?
        WHERE id = ?
      ";

      $donnees = array(
        $chanson->titre, $chanson->duree, $chanson->album,
        $chanson->artiste, $chanson->genre,
        $chanson->dateSortie, $chanson->pays,
        $chanson->id
      );

      $stmt = $this->pdo->prepare($sql);
      $stmt->execute($donnees);
    }
    else {
      /* Ajout */
      $sql = "
        INSERT INTO chansons
        (titre, duree, album, artiste, genre, dateSortie, pays)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      ";

      $donnees = array(
        $chanson->titre, $chanson->duree, $chanson->album,
        $chanson->artiste, $chanson->genre,
        $chanson->dateSortie, $chanson->pays
      );

      $stmt = $this->pdo->prepare($sql);
      $stmt->execute($donnees);
      $chanson->id = $this->pdo->lastInsertId();
    }
        
    return $chanson;
  }

  /*
    Supprime dans la BD une chanson spécifiée par son 'id'.
  */

  function supprimerChanson($id) {
    $sql = "DELETE FROM chansons where id = ?";
    $stmt = $this->pdo->prepare($sql);
    $stmt->execute([$id]);
  }  
}
