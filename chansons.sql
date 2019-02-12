CREATE TABLE chansons (
  id int unsigned PRIMARY KEY AUTO_INCREMENT,
  titre varchar(255) NOT NULL,
  duree varchar(50) NOT NULL,
  album varchar(255) NOT NULL,
  artiste varchar(255) NOT NULL,
  genre varchar(100) NOT NULL,
  dateSortie varchar(50) NOT NULL,
  pays varchar(100) NOT NULL
);

INSERT INTO chansons (titre, duree, album, artiste, genre, dateSortie, pays)
VALUES ("Tom Sawyer", "4:34", "Moving Pictures", "Rush", "Rock", "1981-02-12", "Canada");

INSERT INTO chansons (titre, duree, album, artiste, genre, dateSortie, pays)
VALUES ("Where the Streets Have No Name", "5:38", "The Joshua Tree", "U2", "Rock", "1987-03-09", "Irlande");

INSERT INTO chansons (titre, duree, album, artiste, genre, dateSortie, pays)
VALUES ("Hey Jude", "7:11", "Hey Jude", "The Beatles", "Pop rock", "1968-08-26", "Angleterre");
