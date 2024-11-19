import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Company } from '../type';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { options as chartOptions, dataChart } from '../chatjs/companyDetailsChat';  // Renommage pour éviter le conflit
import { MdLocalPhone } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import { MdLocalLibrary } from "react-icons/md";

// Register components for Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const CompanyDetails: React.FC = () => {
  const { id } = useParams();
  const [singleCompany, setSingleCompany] = useState<Company | null>(null);

  useEffect(() => {
    async function fetchSingleCompany() {
      try {
        const res = await axios.get(`http://localhost:5010/api/company/getCompanyById/${id}`);
        setSingleCompany(res.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchSingleCompany();
  }, [id]);

  if (!singleCompany) {
    return <div className="text-center mt-10">Loading company details...</div>;
  }

  // Example payment history data, replace it with real data from your API
  const paymentHistory = [
    { date: new Date('2024-01-01').toLocaleDateString('fr-FR'), amount: 500 },
    { date: new Date('2024-04-10').toLocaleDateString('fr-FR'), amount: 400 },
    { date: new Date('2024-08-01').toLocaleDateString('fr-FR'), amount: 450 },
    { date: new Date('2024-10-01').toLocaleDateString('fr-FR'), amount: 350 },
    { date: new Date('2024-10-20').toLocaleDateString('fr-FR'), amount: 5500 },
  ];

  const data = dataChart(paymentHistory);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8">
        {/* Nom de l'entreprise */}
        <h1 className="text-4xl font-bold text-gray-800 mb-4">{singleCompany.name}</h1>
  
        {/* Informations sur l'entreprise */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            {/* Adresse */}
            <div className="flex items-center">
              <MdLocalLibrary className='mr-3'/>
              <span className="text-gray-600">{singleCompany.address}</span>
            </div>
  
            {/* Contact */}
            <div className="flex items-center">
              <MdLocalPhone className='mr-3'/>
              <span className="text-gray-600">{singleCompany.contact}</span>
            </div>
  
            {/* Email */}
            <div className="flex items-center">
              <MdEmail className='mr-3' size={20}/>
              <span className="text-gray-600">{singleCompany.email}</span>
            </div>
          </div>
  
          {/* Statut de paiement */}
          <div className="space-y-4">
            <div className="flex items-center">
              <span className={`text-lg font-bold ${singleCompany.status === 'Payé' ? 'text-green-600' : 'text-red-600'}`}>
                Statut: {singleCompany.status}
              </span>
            </div>
  
            {/* Informations de relance */}
            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-700">Relances</h3>
              <p className="text-gray-600">
                Dernière relance: {singleCompany.relance.derniere_relance || 'Aucune'}
              </p>
              <p className="text-gray-600">
                Prochaine relance: {singleCompany.relance.prochaine_relance}
              </p>
              <p className="text-gray-600">
                Nombre de relances: {singleCompany.relance.nombre_relance_effectuee}
              </p>
            </div>
          </div>
        </div>
  
        {/* Graphique d'historique des paiements */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Historique des paiements</h2>
          <Line data={data} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default CompanyDetails;
