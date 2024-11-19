import axios, { AxiosResponse } from 'axios';

// Interfaces pour les réponses et les données
interface Relance {
  temp_entre_relance_jours: number;
}

interface Company {
  _id?: number;
  name: string;
  email: string;
  address: string;
  contact: string;
  langue: 'francophone' | 'anglophone';
  relance: Relance;
}

interface PaginationResponse<T> {
  totalPages: number;
  totalElements: number;
  size: number;
  content: T[];
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  numberOfElements: number;
  pageable: {
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    unpaged: boolean;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
  };
  first: boolean;
  last: boolean;
  empty: boolean;
}

// Instance Axios avec configuration commune
const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL_LOCALHOST,
  timeout: 10000,
});

// Service Company
const company = {
  // Récupérer toutes les entreprises avec pagination
  getAllCompany: (): Promise<AxiosResponse<PaginationResponse<Company>>> => {
    return api.get(`api/company/getAllCompany`);
  },

  // Récupérer une entreprise par son ID
  getCompanyById: (id: number): Promise<AxiosResponse<Company>> => {
    return api.get(`api/company/getCompanyById/${id}`);
  },

  // Ajouter une nouvelle entreprise
  addNewCompany: (payload: Company): Promise<AxiosResponse<Company>> => {
    return api.post(`api/company/addCompany`, payload);
  },
};

export default company;
