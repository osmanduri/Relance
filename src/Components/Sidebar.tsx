import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="fixed inset-y-0 left-0 w-64 h-screen shadow-md z-50 bg-[#0B143A]">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
      </div>
      <nav className="p-6 text-white">
        <Link to="/" className="block mb-2 text-white hover:bg-[#1C2B5A] p-2 rounded">Tableau de bord</Link>
        <Link to="/payments" className="block mb-2 text-white hover:bg-[#1C2B5A] p-2 rounded">Relances</Link>
        <Link to="/test" className="block mb-2 text-white hover:bg-[#1C2B5A] p-2 rounded">Report</Link>
        <Link to="/ajouter_client" className="block mb-2 text-white hover:bg-[#1C2B5A] p-2 rounded">Ajouter un client</Link>
      </nav>
    </div>
  );
};

export default Sidebar;
