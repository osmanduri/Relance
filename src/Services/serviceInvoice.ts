// Service Invoice
import axios, { AxiosResponse } from 'axios';



// Interfaces pour typer les données

// Structure de la société (Company)
export interface ICompany {
  _id: string;
  name: string;
  email: string;
  address: string;
  contact: string;
  langue: string;
  relance: {
    temp_entre_relance_jours: number;
    derniere_relance: string;
    prochaine_relance: string;
    nombre_relance_effectuee: number;
  };
  payment_history: Date[];
  createdAt: Date;
}

// Structure de la facture (Invoice)
export interface IInvoice {
  _id: string;
  chemin: string;
  societeId: string; // Référence à une société
  date: Date;
  montant: number;
  statut: 'payée' | 'en attente' | 'annulée';
}

// Structure pour la réponse paginée
export interface PaginationResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
}

// Instance Axios avec configuration commune
const api = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL_LOCALHOST,
    timeout: 10000,
  });

  
// Service Invoice avec les fonctions
const invoice = {
  // Récupérer toutes les entreprises avec pagination
  getAllInvoice(): Promise<AxiosResponse<PaginationResponse<IInvoice>>> {
    return api.get(`/api/company/getAllCompany`);
  },

  // Récupérer une facture par son ID
  getInvoiceById(id: string): Promise<AxiosResponse<IInvoice>> {
    return api.get(`/api/company/getCompanyById/${id}`);
  },

  // Ajouter une nouvelle entreprise
  addInvoice(payload: Omit<ICompany, '_id' | 'createdAt'>): Promise<AxiosResponse<ICompany>> {
    return api.post(`/api/company/addCompany`, payload);
  },

  // Ajouter une facture
  uploadInvoice(formData: FormData): Promise<AxiosResponse<IInvoice>> {
    return api.post(`/api/company/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};

export default invoice;
