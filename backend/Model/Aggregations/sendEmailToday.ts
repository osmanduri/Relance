import Societe from '../SocieteModel'; // Assure-toi que le modèle est correctement importé

const getCompanyByAggregate = async () => {
  try {
    // Pipeline d'agrégation
    const societes = await Societe.aggregate([
      {
        $match: {
          $expr: {
            $eq: [
              '$relance.prochaine_relance',
              {
                $concat: [
                  { $toString: { $dayOfMonth: '$$NOW' } },
                  '-',
                  { $toString: { $month: '$$NOW' } },
                  '-',
                  { $toString: { $year: '$$NOW' } }
                ]
              }
            ]
          }
        }
      }
    ]);
    return societes;
  } catch (error) {
    console.error('Erreur lors de l\'extraction des documents :', error);
    throw error; // Renvoyer l'erreur pour gérer correctement dans le reste du code
  }
};

export default getCompanyByAggregate;
