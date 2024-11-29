// import du framework ExpressJs
// import express from "express";
const express = require("express");
const mysql = require("mysql");
const myConnection = require("express-myconnection");
const url = require("url");
const fs = require("fs"); // le module fs permet de manipuler des fichiers

const optionConnection = {
    host: "localhost",
    user: "root",
    password: "pd+12SQm",
    port: 3306,
    database: "restaurant"
};

// on crée l'application Expressjs
const app = express();

// Middleware de connection à la base de données
// 'pool' est la stratégie de connection à la base de données 
app.use(myConnection(optionConnection, "pool"));

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
    //1. Récupère actuelle
    let date = new Date();
    let salutation ="Bonjour";

    //2. Affiche Bonjour =si c'est le matin, Bonsoir pour le soir
    if(date.getHours() > 14) {
        salutation = "Bonsoir";
    }
    utilisateur = {
        nom:["Combo", "Said", "Abdou"],
        prenom: "Nourdine",
        maSalutation: salutation
    };

    res.render("accueil", utilisateur);
    
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

// créer une route avec la méthode PUT

// créer une route avec la méthode DELETE

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