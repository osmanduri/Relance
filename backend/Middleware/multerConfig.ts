import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { Request } from 'express';

// Configuration de Multer avec un chemin dynamique
const storage = multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
      const nomClient = req.body.companyName?.trim(); // Récupérer depuis req.body
      
      // Vérifiez que le nom du client existe
      if (!nomClient) {
        return cb(new Error('Le nom de la société est requis pour uploader la facture.'), '');
      }
  
      // Créer un chemin basé sur le nom de la société
      const uploadPath = path.join('uploads', 'Factures', nomClient);
  
      console.log('Chemin du répertoire upload :', uploadPath);
  
      try {
        // Créer le répertoire s'il n'existe pas
        if (!fs.existsSync(uploadPath)) {
          fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath); // Passe le chemin au callback
      } catch (err) {
        cb(new Error(`Erreur lors de la création du répertoire : ${(err as Error).message}`), '');
      }
    },
  
    filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
      const uniqueName = `${Date.now()}-${file.originalname}`; // Ajouter un timestamp au nom du fichier
      console.log('Nom unique du fichier :', uniqueName);
      cb(null, uniqueName);
    },
  });
  
  export const upload = multer({
    storage,
    fileFilter: (req, file: Express.Multer.File, cb) => {
      console.log('Fichier reçu :', file);
      if (file.mimetype !== 'application/pdf') {
        // Filtrer uniquement les fichiers PDF
        return cb(new Error('Seuls les fichiers PDF sont acceptés.') as unknown as null, false);
      }
      cb(null, true);
    },
  });
  
