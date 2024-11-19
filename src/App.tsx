import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './Pages/Dashboard';
import CompanyDetails from './Pages/CompanyDetails';
import Sidebar from './Components/Sidebar'; // Import de la Sidebar
import AjouterClient from './Pages/AjouterClient';

const App = () => {
  return (
    <Router>
      <div className="flex">
        {/* Sidebar toujours visible */}
        <Sidebar />
        <div className="flex-1 ml-64"> {/* Ajustement pour laisser l'espace de la sidebar */}
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/company/:id" element={<CompanyDetails />} />
            <Route path="/ajouter_client" element={<AjouterClient />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
