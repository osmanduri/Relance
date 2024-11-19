import mongoose, { Document, Schema } from 'mongoose';
import dayjs from 'dayjs';

export interface IFacture extends Document {
  chemin: string; // Chemin du fichier PDF
  societeId: Schema.Types.ObjectId; // Référence à l'entreprise
  date: Date; // Date de création
  montant: number; // Montant de la facture
  statut: 'payée' | 'en attente' | 'annulée'; // Statut de la facture
}

// Schéma de la collection Factures
const FactureSchema: Schema = new Schema({
  chemin: { type: String, required: true }, // Chemin du fichier PDF
  societeId: { type: Schema.Types.ObjectId, ref: 'Societe', required: true }, // Référence à l'entreprise
  date: { 
    type: Date, 
    default: () => dayjs().toDate() // Utilisation de dayjs pour la date actuelle
  },
  montant: { type: Number, required: true }, // Montant de la facture
  statut: {
    type: String,
    enum: ['payée', 'en attente', 'annulée'],
    default: 'en attente', // Statut par défaut
  },
});

// Création du modèle Mongoose
const FactureModel = mongoose.model<IFacture>('Facture', FactureSchema);

export default FactureModel;
