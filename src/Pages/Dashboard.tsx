import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DashboardCards from '../Components/DashboardCards'; // Importation du nouveau composant
import { Company } from '../type';
import company from '../Services/serviceCompany';

const Dashboard = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const companiesPerPage = 9;
  const indexOfLastCompany = currentPage * companiesPerPage;
  const indexOfFirstCompany = indexOfLastCompany - companiesPerPage;

  const currentCompanies = companies.slice(indexOfFirstCompany, indexOfLastCompany);
  const totalPages = Math.ceil(companies.length / companiesPerPage);

  useEffect(() => {
    async function fetchCompany() {
      try {
        const res = await company.getAllCompany();
        setCompanies(res.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchCompany();
  }, []);

  return (
    <div className="flex-1 p-6 transition-all duration-300 ease-in-out">
      <h2 className="text-3xl font-semibold text-gray-700 mb-4">Payments Overview</h2>

      <div className="flex flex-col justify-between min-h-[700px]">
        {/* Company List */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
          >
            {currentCompanies.map((company) => (
              <DashboardCards key={company._id} company={company} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Pagination */}
        <div className="mt-6 flex justify-between items-center">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
          >
            Previous
          </button>
          <span className="text-gray-700">
            Page {currentPage} / {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
