import express, { Request, Response } from 'express';
import Societe from './models/Societe'; // Votre modèle

const router = express.Router();

router.post('/societes', async (req: Request, res: Response) => {
    try {
        const nouvelleSociete = await Societe.create(req.body);
        res.status(201).json(nouvelleSociete);
    } catch (err: any) {
        if (err.code === 11000) {
            // Gestion de l'erreur d'unicité
            res.status(400).json({ 
                message: 'Une société avec ce nom existe déjà.',
                field: Object.keys(err.keyPattern)[0] // Indique le champ qui a causé le problème
            });
        } else {
            // Gestion d'autres erreurs
            res.status(500).json({ 
                message: 'Une erreur est survenue.',
                error: err.message 
            });
        }
    }
});

export default router;
