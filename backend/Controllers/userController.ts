import { Request, Response } from 'express';
import userModel from '../Model/userModel';
import { Types } from 'mongoose'; // Pour ObjectId
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Interface pour le type utilisateur dans req (si tu utilises un middleware d'authentification)
interface AuthenticatedRequest extends Request {
  user?: { isAdmin: boolean };
}

// Méthode pour vérifier si l'utilisateur est connecté
export const verifyConnected = async (req: Request, res: Response) => {
  res.send('connected!');
};

// Méthode pour vérifier si l'utilisateur est administrateur ou non
export const verifyIsUserOrAdmin = (req: AuthenticatedRequest, res: Response) => {
  if (req.user?.isAdmin === true) {
    return res.send("isAdmin");
  } else if (req.user?.isAdmin === false) {
    return res.send("isNotAdmin");
  } else {
    return res.send("unknown");
  }
};

// Méthode pour récupérer tous les utilisateurs
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await userModel.find();
    res.send(users);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const addUser = (req: Request, res: Response) => {
  // Logique pour ajouter un utilisateur
  res.send('User added successfully!');
}