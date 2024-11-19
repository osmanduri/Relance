import { ISociete } from './Model/SocieteModel'; // Adapte le chemin vers ton modèle

declare module 'express-serve-static-core' {
  interface Request {
    company?: ISociete; // La propriété est maintenant reconnue comme étant du type ISociete
  }
}
