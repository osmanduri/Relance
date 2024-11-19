import React, { useState } from 'react';
import { ClientData } from '../type';
import company from '../Services/serviceCompany';
import invoice from '../Services/serviceInvoice'

export default function AjouterClient() {
  const [formData, setFormData] = useState<ClientData>({
    companyName: '',
    email: '',
    address: '',
    phone: '',
    file: null,
    langue: 'francophone',
    intervalJourDeRelance: 15,
  });

  const [msgServer, setMsgServer] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'intervalJourDeRelance' ? parseInt(value) : value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({
        ...formData,
        file: e.target.files[0],
      });
    }
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setMsgServer('');
  setIsLoading(true);

  try {
    // Étape 1 : Ajouter la société
    const payload = {
      name: formData.companyName,
      email: formData.email,
      address: formData.address,
      contact: formData.phone,
      langue: formData.langue,
      relance: {
        temp_entre_relance_jours: formData.intervalJourDeRelance,
      },
    };

    const addCompanyResponse = await company.addNewCompany(payload);

    // Vérifier si la société a été créée avec succès
    
    if (!addCompanyResponse.data._id || !addCompanyResponse.data.name) {
      throw new Error("L'ID de la société n'a pas été retourné.");
    }

    console.log('Société ajoutée avec succès :', addCompanyResponse.data);

    if (formData.file) {
      const formDataPayload = new FormData();
    
      // Ajouter l'ID de la société et le nom de la société
      formDataPayload.append('_id', addCompanyResponse.data._id.toString()); // ID de la société
      formDataPayload.append('companyName', addCompanyResponse.data.name); // Nom de la société
      formDataPayload.append('facture', formData.file); // Le fichier de la facture
    
      // Faire la requête pour uploader la facture
      const uploadResponse = await invoice.uploadInvoice(formDataPayload);
      console.log('Facture uploadée avec succès :', uploadResponse.data);
    }

    setMsgServer('Le client a été ajouté avec succès.');
    setFormData({
      companyName: '',
      email: '',
      address: '',
      phone: '',
      file: null,
      langue: 'francophone',
      intervalJourDeRelance: 15,
    });
  } catch (error: any) {
    console.error("Erreur lors de l'ajout du client :", error);
    setMsgServer(error.response?.data?.message || 'Une erreur est survenue.');
  } finally {
    setIsLoading(false);
  }
};


  return (
    <div className="p-8 flex justify-center">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-8 border border-black">
        <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Ajouter un Client
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Nom de l'entreprise */}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                <span className="flex items-center gap-1">
                  <i className="fas fa-building text-blue-500"></i>
                  Nom de l'entreprise
                </span>
              </label>
              <input
                type="text"
                name="companyName"
                placeholder="Entrez le nom de l'entreprise"
                value={formData.companyName}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
                required
              />
              <p className="text-[red] text-left py-1 pl-2">{msgServer}</p>
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                <span className="flex items-center gap-1">
                  <i className="fas fa-envelope text-blue-500"></i>
                  Email
                </span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Entrez l'email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
                required
              />
            </div>

            {/* Adresse */}
            <div className="md:col-span-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                <span className="flex items-center gap-1">
                  <i className="fas fa-map-marker-alt text-blue-500"></i>
                  Adresse
                </span>
              </label>
              <textarea
                name="address"
                placeholder="Entrez l'adresse"
                value={formData.address}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
                required
              ></textarea>
            </div>

            {/* Téléphone */}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                <span className="flex items-center gap-1">
                  <i className="fas fa-phone text-blue-500"></i>
                  Téléphone
                </span>
              </label>
              <input
                type="tel"
                name="phone"
                placeholder="Entrez le numéro de téléphone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
                required
              />
            </div>

            {/* Langue */}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                <span className="flex items-center gap-1">
                  <i className="fas fa-language text-blue-500"></i>
                  Langue
                </span>
              </label>
              <select
                name="langue"
                value={formData.langue}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
                required
              >
                <option value="francophone">Francophone</option>
                <option value="anglophone">Anglophone</option>
              </select>
            </div>

            {/* Interval de jour de relance */}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                <span className="flex items-center gap-1">
                  <i className="fas fa-calendar-day text-blue-500"></i>
                  Interval de jour de relance (en jours)
                </span>
              </label>
              <input
                type="number"
                name="intervalJourDeRelance"
                placeholder="Entrez l'intervalle en jours"
                value={formData.intervalJourDeRelance}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
                required
              />
            </div>

            {/* Document PDF */}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                <span className="flex items-center gap-1">
                  <i className="fas fa-file-upload text-blue-500"></i>
                  Document PDF (Facture)
                </span>
              </label>
              <input
                type="file"
                name="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
                required
              />
            </div>
          </div>

          {/* Bouton de soumission */}
          <div className="mt-8 text-center">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-500 focus:ring focus:ring-blue-400 focus:outline-none"
            >
              {isLoading ? 'Chargement...' : 'Ajouter le Client'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
