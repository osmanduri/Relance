// src/types.ts
export interface Company {
    _id: string;
    name: string;
    email: string;
    address: string;
    contact: string;
    creatadAt: string;
    email_envoye: boolean;
    payment_history: string[];
    process_ouvert: boolean;
    relance: {
      temp_entre_relance_jours: number;
      derniere_relance: string;
      prochaine_relance: string;
      nombre_relance_effectuee: number;
    };
    status: string;
    zipCode: string;
    city:string;
    reminderSent: boolean;
  }

  export interface PaymentHistory {
    date: string;  // Format de date en string après utilisation de toLocaleDateString
    amount: number;  // Le montant du paiement
  }

// types.ts
export interface ClientData {
  companyName: string;
  email: string;
  address: string;
  phone: string;
  file: File | null;
  intervalJourDeRelance: number;
  langue: 'francophone' | 'anglophone';
}
  