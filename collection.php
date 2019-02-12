<?php

/*
  Service JSON effectuant les opération CRUD pour la collection de chansons :
  
  GET sans 'id' - détails de toutes les chansons
  GET avec 'id' - détails d'une chanson en particulier
  POST - ajout ('id' == 0) ou modification d'une chanson
  DELETE - suppression d'une chanson en particulier
*/

require('modele-collection.php');

$modele = new ModeleCollection();

switch ($_SERVER['REQUEST_METHOD']) {
  case 'GET':
    if (empty($_GET['id'])) {
      $chansons = $modele->lireChansons();
      echo json_encode($chansons);
    }
    else {
      $chanson = $modele->lireChanson($_GET['id']);
      echo json_encode($chanson);
    }
    
    break;
  
  case 'POST':
    $json = file_get_contents("php://input");
    $chanson = json_decode($json);
    $chanson = $modele->enregistrerChanson($chanson);
    echo json_encode($chanson);
    break;
    
  case 'DELETE':
    $chaine = file_get_contents("php://input");
    parse_str($chaine, $params);
    $modele->supprimerChanson($params['id']);
    echo "{}";
    break;
}