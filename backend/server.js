import express from 'express';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import cors from 'cors'; // Import the cors package

dotenv.config(); // Charge les variables d'environnement depuis .env

const app = express();
const port = 3000;

app.use(cors()); // Use cors middleware to allow all origins (for development)
app.use(express.json()); // Middleware pour parser le JSON dans les requêtes

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

app.post('/api/verify', async (req, res) => {
    const { name, username, date } = req.body; // Récupère les données du formulaire modifié
    console.log('Serveur a reçu :', { name: name, username: username, date: date }); // Log des données reçues
    if (!name || !username || !date) {
        return res.status(400).json({ error: 'Tous les champs sont requis.' });
    }

    try {
        const { data: user, error } = await supabase
            .from('birthday') // Assure-toi que le nom de ta table est correct
            .select('id, name, username, date_of_birth') // Sélectionne les colonnes correspondantes
            .eq('name', name)
            .eq('username', username)
            .eq('date_of_birth', date)
            .single();
            console.log(); // Log pour vérifier la réponse de Supabase
        if (error || !user) {
            return res.status(401).json({ error: 'Informations incorrectes.' });
        }

        return res.json({ success: true });

    } catch (error) {
        console.error('Erreur lors de la vérification :', error);
        return res.status(500).json({ error: 'Erreur serveur lors de la vérification.' });
    }
});

app.listen(port, () => {
    console.log(`Serveur backend écoutant sur le port ${port}`);
});