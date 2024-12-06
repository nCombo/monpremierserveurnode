// import du framework ExpressJs
// import express from "express";
const express = require("express");
//const mysql = require("mysql");
const mysql2 = require("mysql2");
const myConnection = require("express-myconnection");
const url = require("url");
const fs = require("fs"); // le module fs permet de manipuler des fichiers




// on crée l'application Expressjs
const app = express();
// je configure les paramètres de connection à MySQL Server
const optionConnection = {
    host: "localhost",
    user: "root",
    password: "pd+12SQm",
    database: "restaurant",
    port: 3306
};

// Middleware de connection à la base de données
// 'pool' est la stratégie de connection à la base de données 
app.use(myConnection(mysql2, optionConnection, "pool"));

// Extraction des données du formulaire
app.use(express.urlencoded({extended: false}));
// L'endroit où se situent les vues qui s'affichent sur la navigateur
app.set("views", "./views"); 

// Précisez le moteur de lecture de vues à savoir ejs
app.set("view engine", "ejs"); 

// Précise le répertoire 'public' qui contient les fichiers statics
app.use(express.static("public"));

// le serveur retourne la réponse ci-dessous peu importe la requête
/*
=== Middleware ===
Les middleware est un ensemble de fonctions que l'on peut combiner
dans un seul serveur.
*/

/*
// Middleware 1
app.use((req, res, next) => {
    console.log("Votre message a bien été reçu");
    next();
});

// Middleware 2
app.use((req, res, next) => {
    res.status(201);
    next();
});

// Middleware 3
app.use((req, res, next) => {
    const date = new Date();
    res.json({
        heure : date.toLocaleTimeString(),
        typeRequest : req.method,
        reqHeaders: req.headers
    });
    
    next();
});

// Middleware 4
app.use((req, res, next) => {
 console.log("Fin de Middleware!");
 next();
});
*/

// on définit une route de type GET
// gère les reqêtes GET vers la page d'accueil
app.get("/", (req, res) => {
    // je précise le type et l'encodage du contenu de la réponse
    res.writeHead(200, {
        "content-type":"text/html;charset=utf-8"
    });
    // Le contenu de la réponse retournée et qui s'affiche sur le navigateur
    res.write("<b>Akori, za serveur.</b> Je vie à Mayotte.");
    res.end(); // Fin de réponse retournée par le serveur
});

// route pour http://localhost:3002/accueil
// API
app.get("/accueil", (req, res) => {
    
    // Je veux récupèerer la liste des plats enregistrés dans la base de données 'Restaurant'
    // D'abord, je me connecte à la base de données grâce à la méthode getConnection()
    req.getConnection((erreur, connection)=> {
        if(erreur) { // Je teste s'il y a une erreur lors de la connection à la base de données
            console.log(erreur); // J'affiche l'erreur
        } else { // S'il n'y a pas d'erreur de connection à la base de données
            // Alors, j'envoie une requête SQL pour récupérer tous les enregistrements de la table 'plat'
            // Et les enregistrements récupérés sont stockés dans un tableau []
            connection.query("SELECT * FROM plat",[], (err, resultat) => {
                if (err) { // Je teste s'il y a une erreur
                    console.log(err);
                } else { // S'il n'y a pas d'erreur
                    // J'affiche le résultat sur la console du serveur nodejs
                    console.log("resultat : ", resultat);
                    // Je retourne au clien tla vue 'accueil' associée au résultat provenant de la bse de données
                    res.render("accueil", {resultat}); 
                }

            });
        }
    }); 
});
// route /apropos
app.get("/apropos", (req, res) => {
    plat = {
        nom: ["poulet fourr", "Banane vert", "Brochette"],
        prix: 15
    };
    res.render("apropos", plat);

    //res.sendFile(__dirname+"/apropos.html");
});
// route pour /services
app.get("/services", (req, res) => {
    res.end("Alors cette page de services!");
});
// route /contact
app.get("/contact", (req, res) => {
    res.end("bienvenu à notre page de contact");
});

// créer une route avec la méthode POST
app.post("/plat", (req, res) => {
    console.log("Corps requête Body: ", req.body);
    console.log("Corps requête nom: ", req.body.nom);
    console.log("Corps requête prix: ", req.body.prix);
    
    let nomPlat = req.body.nom;
    let prixPlat = req.body.prix;
    let platId;
    let requeteSQL;

    if(req.body.id === "") {
        platId = null;
        requeteSQL = "INSERT INTO plat(id,nom, prix) VALUES(?,?,?)"; // [id, nom,prix]
    } else {
        platId = req.body.id;
        requeteSQL = "UPDATE plat SET nom = ?, prix = ? WHERE id = ?";
    }
    
    let ordreDonnees;
    if(platId === null) { // Création
        ordreDonnees = [null,nomPlat, prixPlat];// Ordre de données [id, nom, prix]
    } else { // Modification
        ordreDonnees = [nomPlat, prixPlat, platId];// Ordre de données [nom, prix, id]
    }

    req.getConnection((erreur, connection)=> {
        if(erreur) { 
            console.log(erreur); 
        } else { 
            connection.query(requeteSQL, ordreDonnees, (err, nouveauPlat) => {
                if (err) { 
                    console.log(err);
                } else { 
                    console.log("Insertion réussie  ==) ");
                    // Je redirige l'utilisateur vers la vue accueil
                    res.status(300).redirect("/accueil"); 
                }
            });
        }
    });

    //res.render("formplat");
});
// créer une route avec la méthode PUT

// créer une route avec la méthode DELETE
// localhost:3006/plat/1, le chiffre 1 correspoand à l'id du plat à supprimer
app.delete("/plat/:id", (req, res) => {
    let platId = req.params.id; // récupère l'id à partir de l'objet params

    req.getConnection((erreur, connection) => {
        if (erreur) {
            console.log(erreur);
        } else {
            connection.query("DELETE FROM plat WHERE id = ?", 
                [platId], (err, result) => {
                    if(err) {
                        console.log(err);
                    } else {
                        console.log("Suppression réussie");
                    res.status(200).json({ routeRacine: "/"});
                    }
                });
        }
    });

});
/*
=== API ===
*/

// format URL : localhost:3002/api/nom
app.get("/api/nom", (req, res) => {
    const monObjet = [{
        nom: "Abdou",
        prenom: "Kamal"
    }];

    // Retourne l'objet "monObjet" sous format JSON et retourne le code 200
    res.status(200).json(monObjet);
});

// format URL : localhost:3002/api/url
app.get("/api/url", (req, res) => {
    // Je retourne une réponse de HTML et de status 200
    res.writeHead(200, {'Content-Type': 'text/html'});

    res.write(req.url); // Récupère l'URL passé dans la requête

    res.end(); // Fin de réponse
});

// format URL : localhost:3002/?annee=2024
/* Exemple https://www.google.com/search?q=mayotte
 Analyse de l'URL :
 l'url de base : https://www.google.com
 l'url complet avec l'API '/search' : https://www.google.com/search
 l'url complet avec des paramètres. 
 les paramètres sont précédés par le point d'interrogation '?'
 Le mot-clé 'q' contient la valeur 'Mayotte' ?q=mayotte
  
*/

//URL : localhost:3002/param?annee=2024
app.get("/param", (req, res) => {
    console.log(url.parse(req.url, true).query.annee);
    console.log(req.query.mois);
    res.writeHead(200, {'Content-Type': 'text/html'});
    
    res.end(req.query.annee + " " + req.query.mois);

    // let query = url.parse(req.url, true).query;
    // let = resultatAffiche = query.annee;

    
});

module.exports = app;


// crée la route "/bonjour" de type
// gère les requêtes GET vers la page bonjour
// app.get("/bonjour", (req, res) => {
//     res.send("Akori anao?");
// });

// crée une route "/cuisine" de type GET
// Gère les requêtes GET vers la page cuisine
// app.get("/cuisine", (req, res) => {
//     res.end("Vous êtes dans la cuisine.");
// });

// Crée une route "/bangalo" de type GET pour voir 
// une liste de bangalo

// app.listen(3001, () => {
//     console.log("Serveur écoute le port 3001");
// });