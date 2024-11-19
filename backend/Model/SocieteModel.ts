import mongoose, { Document, Schema } from 'mongoose';
import dayjs from 'dayjs';

// Interface décrivant la structure du document
export interface ISociete extends Document { // Ajout de "export"
    name: string;
    email: string;
    status: string;
    address: string;
    contact: string;
    langue: string;
    relance: {
        temp_entre_relance_jours: number;
        derniere_relance: string;
        prochaine_relance: string; // Ce sera calculé
        nombre_relance_effectuee: number;
    };
    payment_history: Date[];
    createdAt: Date; // Date de création de la société
}

// Définir le schéma Mongoose
const SocieteSchema: Schema = new Schema({
    name: { type: String, required: true, uppercase: true, trim: true, unique: true },
    email: { type: String, required: true },
    status: { type: String, required: false, default: "non payé" },
    address: { type: String, required: true },
    contact: { type: String, required: true },
    langue: { type: String, required: true },
    payment_history: { type: [String], required: false }, // Tableau de dates
    process_ouvert: { type: Boolean, default: true },
    relance: {
        temp_entre_relance_jours: { type: Number, required: true },
        derniere_relance: { type: String, default: "aucune" },
        prochaine_relance: { type: String }, // Calculé lors de l'ajout
        nombre_relance_effectuee: {
            type: Number,
            required: true,
            default: 0,
            validate: {
                validator: (value: number) => value <= 2, // Limite à 3
                message: 'Le nombre de relances effectuées ne peut pas dépasser 3.',
            },
        },
    },

    createdAt: { type: Date, default: Date.now }, // Date de création par défaut
});

// Middleware avant d'enregistrer pour calculer prochaine_relance
SocieteSchema.pre<ISociete>('save', function (next) {
    if (this.isNew) {
        const tempDays = this.relance.temp_entre_relance_jours;
        const creationDate = this.createdAt; // Date de création
        const prochaineRelanceDate = dayjs(creationDate).add(tempDays, 'day'); // Ajoute le nombre de jours

        // Formate la date au format DD-MM-YYYY
        this.relance.prochaine_relance = prochaineRelanceDate.format('DD-MM-YYYY');
    }
    next();
});

// Créer le modèle avec le schéma et l'interface
const Societe = mongoose.model<ISociete>('Societe', SocieteSchema);

Societe.syncIndexes()
    .then(() => console.log("Indexes synchronized successfully"))
    .catch(err => console.error("Error syncing indexes:", err));

export default Societe;
