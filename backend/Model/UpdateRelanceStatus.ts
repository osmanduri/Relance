import dayjs from 'dayjs';
import SocieteModel from './SocieteModel'; // Votre modèle MongoDB

export async function updateRelanceStatus(id: string): Promise<void> {
  try {
    // Obtenez la société par ID
    const societe = await SocieteModel.findById(id);

    if (!societe) {
      throw new Error(`Société avec l'ID ${id} non trouvée`);
    }

    const today = dayjs().format('DD-MM-YYYY'); // Format du jour actuel en "DD-MM-YYYY"
    const tempEntreRelanceJours = societe.relance.temp_entre_relance_jours;

    // Calcul de la prochaine relance
    const prochaineRelance = dayjs().add(tempEntreRelanceJours, 'day').format('DD-MM-YYYY');

    // Mise à jour dans MongoDB
    const updatedDocument = await SocieteModel.findByIdAndUpdate(
        id,
        {
          $set: {
            'relance.derniere_relance': today,
            'relance.prochaine_relance': prochaineRelance,
          },
          $inc: {
            'relance.nombre_relance_effectuee': societe.relance.nombre_relance_effectuee < 2 ? 1 : 0,
          },
        },
      { new: true } // Retourne le document mis à jour
    );

    console.log(`Relance mise à jour pour la société ${updatedDocument?.name}`);
  } catch (error) {
    console.error(`Erreur lors de la mise à jour du statut de relance :`, error);
  }
}
