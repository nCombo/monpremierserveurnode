// import du framework ExpressJs
// import express from "express";
const express = require("express");

// on crée l'application Expressjs
const app = express();

// on définit une route de type GET
// gère les reqêtes GET vers la page d'accueil
app.get("/", (req, res) => {
    res.end("Akori, za serveur");
});

// crée la route "/bonjour" de type
// gère les requêtes GET vers la page bonjour
app.get("/bonjour", (req, res) => {
    res.send("Akori anao?");
});

// crée une route "/cuisine" de type GET
// Gère les requêtes GET vers la page cuisine
app.get("/cuisine", (req, res) => {
    res.end("Vous êtes dans la cuisine.");
});

// Crée une route "/bangalo" de type GET pour voir 
// une liste de bangalo

app.listen(3001, () => {
    console.log("Serveur écoute le port 3001");
});