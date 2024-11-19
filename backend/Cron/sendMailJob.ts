import cron from 'node-cron';
import getCompanyByAggregate from '../Model/Aggregations/sendEmailToday'; // Import de la fonction
import { sendEmailToClient } from '../Services/emailService';
import path from 'path';
import { updateRelanceStatus } from '../Model/UpdateRelanceStatus';

// Interface pour représenter les données d'une société
interface Relance {
  temp_entre_relance_jours: number;
  derniere_relance: string;
  prochaine_relance: string;
  nombre_relance_effectuee: number;
}

export interface Societe {
  _id: string;
  name: string;
  email: string;
  status: string;
  address: string;
  contact: string;
  payment_history: [];
  process_ouvert: boolean;
  relance: Relance;
  createdAt: string;
  langue:String;
}

// Fonction pour envoyer des emails
async function sendEmail(societes: Societe[]): Promise<void> {
  for (const societe of societes) {
    try {
      const templatePath = path.join(__dirname, `../Templates/relance_${societe.langue}_${societe.relance.nombre_relance_effectuee}.html`);
      
      await sendEmailToClient(societe.email, 'Relance client', templatePath, societe);
      console.log(`E-mail envoyé avec succès à la société ${societe.name}`);
      
      // Met à jour le statut de la société après envoi
      await updateRelanceStatus(societe._id.toString());
    } catch (error) {
      console.error(`Erreur lors de l'envoi de l'e-mail à ${societe.name}:`, error);
    }
  }
}

// Tâche planifiée pour s'exécuter tous les jours à 16:30
export function cron_to_filter_company(): void {
  cron.schedule('20 11 * * *', async () => {
    console.log('Cron Job démarré : Vérification des relances à envoyer');
    try {
      const societes: Societe[] = await getCompanyByAggregate();

      if (societes.length === 0) {
        console.log('Aucune société à relancer aujourd\'hui.');
        return;
      }

      // Envoi des e-mails
      await sendEmail(societes);
    } catch (error) {
      console.error('Erreur lors de l\'exécution du cron job :', error);
    }
  });
}
