const express = require('express');
const { createClient } = require('redis');

const app = express();

// Création du client Redis avec l'URL correcte
const client = createClient({
    url: 'redis://redis-server:6379'  // URL pour le serveur Redis
});

// Gestion des erreurs Redis
client.on('error', (err) => console.log('Erreur du client Redis :', err));

(async () => {
    try {
        // Connexion au serveur Redis
        await client.connect();

        // Initialiser le nombre de visites à 0
        await client.set('visits', 0);

        // Route principale
        app.get('/', async (req, res) => {
            try {
                // Récupérer le nombre actuel de visites
                let visits = await client.get('visits');
                visits = parseInt(visits) + 1;

                // Envoyer le nombre de visites au client
                res.send('Nombre de visites est : ' + visits);

                // Mettre à jour le nombre de visites dans Redis
                await client.set('visits', visits);
            } catch (err) {
                console.error('Erreur lors de la récupération/mise à jour des visites :', err);
                res.status(500).send('Erreur du serveur');
            }
        });

        // Lancer l'application sur le port 8081
        app.listen(8081, () => {
            console.log('Application Node.js en écoute sur le port 8081');
        });
    } catch (err) {
        console.error('Erreur lors de la connexion à Redis :', err);
    }
})();
