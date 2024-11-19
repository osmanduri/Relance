import express from 'express';
import * as dotenv from 'dotenv';
import DbConnection from './Model/DbConnection';
import userRoute from './Router/userRoute';
import companyRoute from './Router/companyRoute';
import serverless from 'serverless-http';
import cors from 'cors'; // Assurez-vous que CORS est importé ici
import {cron_to_filter_company} from './Cron/sendMailJob'

dotenv.config();
DbConnection();

const app = express();

app.use(express.json()); // Middleware pour traiter req.body
app.use(cors()); // Active CORS pour toutes les routes

// Middleware pour les routes des utilisateurs
app.use('/api/users', userRoute);
app.use('/api/company', companyRoute);


cron_to_filter_company();

// Démarrer le serveur
app.listen(process.env.PORT, () => {
    console.log(`Le serveur tourne sur le port ${process.env.PORT}`);
});

// Exporter le handler
module.exports.handler = serverless(app);
