CREATE TABLE equipe(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(155),
    prenom VARCHAR(100),
    statut VARCHAR(155)
);

INSERT INTO plat (id, nom, prix) VALUES(null, "Kakamutku", 11);


CREATE TABLE chanteur(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(155),
    role VARCHAR(100)
);

CREATE TABLE chanson (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(155),
    id_chanteur INT,
    date_sortie DATE,
    FOREIGN KEY (id_chanteur) REFERENCES chanteur(id)
);

INSERT INTO chanson(nom, id_chanteur, date_sortie)
 VALUES("Trango maji",2,'1999-03-01');
