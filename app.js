// import du framework ExpressJs
// import express from "express";
const express = require("express");

// on crée l'application Expressjs
const app = express();

// le serveur retourne la réponse ci-dessous peu importe la requête
/*app.use((req, res) => {
    res.json({message : "Votre message a bien été reçu"});
});*/

// on définit une route de type GET
// gère les reqêtes GET vers la page d'accueil
app.get("/", (req, res) => {
    res.end("Akori, za serveur");
});

// route pour /accueil
app.get("/accueil", (req, res) => {
    res.end("Vous etes à l'accueil.");
});
// route /apropos
app.get("/apropos", (req, res) => {
    res.end("Notre page de présentation.");
});
// route pour /services
app.get("/services", (req, res) => {
    res.end("Alors cette page de services!");
});
// route /contact
app.get("/contact", (req, res) => {
    res.end("bienvenu à notre page de contact");
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