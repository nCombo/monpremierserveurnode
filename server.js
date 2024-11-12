// importer le protocole http
// require() permet d'importer le package, 
// ici le package importé est http
const http = require('http');

// déclaration du serveur en utilisant http
const server = http.createServer((req, res) => {
    res.end("Bonjour, Je suis le serveur.");
});

// le serveur est disponible sur le port 3000
server.listen(3000);

// On va lancer le server!!
// sur GitBash, exécuter la commande node server
// Sur le navigateur web, tapez localhost:3000
// Que signifie "localhost:3000" ?
// localhost signifie le serveur en local, 
// c'est-à-dire dans chaque ordinateur, nodeJS crée un server local
// Et ce serveur local est exposé au port 3000
// Que retenir du bug rencontré par SAID?
// Pour lancer le serveur, il faut taper "node" suivi du nom du fichier 
// tel qu'il figure dans le fichier package.json
// A l'exécution de la commande node, 
// nodejs lance le fichier JavaScript associé à "main" dans package.json

/* 
===== En résumé =====
1. Le projet Node est initialisé avec la commande  " node init"
2. un serveur Node basique est lancé grâce 
à la méthode createServer venant du package http "http.createServer()"
Les paramètres 'req' et 'res' sont obligatoires pour createServer().
'req' signifie la requête de l'utilisateur effectuée le navigateur web
'res' signifie la réponse retournée par le serveur
exemple, ici, le serveur retourne 
le message "Bonjour, Je suis le serveur."
et ce grâce au code res.end("Bonjour, Je suis le serveur.");
*/