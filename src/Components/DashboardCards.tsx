import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Company } from '../type';

interface DashboardCardsProps {
  company: Company;
}

const DashboardCards: React.FC<DashboardCardsProps> = ({ company }) => {
  const navigate = useNavigate();

  

  return (
    <motion.div
      key={company._id}
      className="bg-white shadow-md rounded-lg p-6 relative cursor-pointer"
      whileHover={{ scale: 1.05, translateY: -5 }}
      transition={{ type: 'tween', stiffness: 300 }}
      onClick={() => navigate(`/company/${company._id}`)}
    >
      <div className="flex items-center gap-2">
        <img className="w-4" src="/logo_company/company.svg" alt="Company Logo" />
        <h3 className="text-lg font-semibold text-gray-800">{company.name}</h3>
      </div>
      <div className="mt-3">
        <div className="flex items-center gap-2">
          <img className="w-4 h-4" src="/icons/bell.png" alt="bell" />
          <p className="text-gray-600">
            Dernière relance: <strong className='text-sm capitalize'>{company.relance.derniere_relance || 'Aucune'}</strong>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <img className="w-4 h-4" src="/icons/bell.png" alt="bell" />
          <p className="text-gray-600">
            Prochaine relance: <strong className='text-sm'>{company.relance.prochaine_relance}</strong>
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 mt-2">
        <img className="w-4 h-4" src="/icons/roue.png" alt="roue" />
        <p className={`${company.status === 'Payé' ? 'text-green-600' : 'text-red-600'}`}>
          Status: {company.status}
        </p>
      </div>

      {company.relance.nombre_relance_effectuee > 0 && (
  <span
    className={`absolute top-2 right-2 text-white text-xs font-semibold px-2 py-1 rounded-full ${
      company.relance.nombre_relance_effectuee === 1
        ? 'bg-green-500'
        : company.relance.nombre_relance_effectuee === 2
        ? 'bg-orange-500'
        : company.relance.nombre_relance_effectuee === 3
        ? 'bg-red-500'
        : 'bg-red-500' // Couleur par défaut si la valeur est supérieure à 3
    }`}
  >
    relance: {company.relance.nombre_relance_effectuee}
  </span>
)}
    </motion.div>
  );
};

export default DashboardCards;
