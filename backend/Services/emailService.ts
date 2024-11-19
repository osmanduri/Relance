import ejs from 'ejs';
import nodemailer from 'nodemailer';
import fs from 'fs';
import { Societe } from '../Cron/sendMailJob';

// Configuration du transporteur avec un cast explicite
const transporter = nodemailer.createTransport({
  host: 'smtp.ionos.fr',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
} as any); // Cast "as any" pour ignorer les types

// Fonction pour envoyer un e-mail avec EJS
export async function sendEmailToClient(email: string, subject: string, templatePath: string, data: Societe): Promise<void> {

  try {
    // Lire et compiler le template EJS
    const template = fs.readFileSync(templatePath, 'utf-8'); // Charge le fichier EJS
    const html = ejs.render(template, 
    { 
      name:data.name,
      phone:data.contact
    }); // Compile le template avec les données

    // Configurer les options de l'e-mail
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: subject,
      html: html, // Contenu HTML généré par EJS
    };

    // Envoyer l'e-mail
    await transporter.sendMail(mailOptions);
    console.log(`E-mail envoyé avec succès à ${email}`);
  } catch (error) {
    console.error(`Erreur lors de l'envoi de l'e-mail à ${email}:`, error);
  }
}
