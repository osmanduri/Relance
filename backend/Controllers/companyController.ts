import { Request, Response } from 'express';
import Societe from '../Model/SocieteModel';
import { NextFunction } from 'express-serve-static-core';

export const getAllCompany = async (req:Request, res:Response) => {
    try{
        const allCompany = await Societe.find()

        res.status(200).send(allCompany)
    }catch(err){
        res.status(400).send(err)
    }
    
}

export const getCompanyById = async (req:Request, res:Response) => {
    try{
        const singleCompany = await Societe.findById(req.params.id)


        res.status(200).send(singleCompany)
    }catch(err){
        res.status(400).send(err)
    }
}

export const addCompany = async (req: Request, res: Response) => {
    try {
        const newCompany = new Societe({
            name: req.body.name,
            email: req.body.email,
            status: req.body.status,
            address: req.body.address,
            contact: req.body.contact,
            payment_history: req.body.payment_history,
            langue:req.body.langue,
            relance: {
                temp_entre_relance_jours: req.body.relance.temp_entre_relance_jours,
                derniere_relance: req.body.relance.derniere_relance,
                prochaine_relance: '', // Ce champ sera rempli automatiquement par le middleware dans le modèle
                nombre_relance_effectuee: req.body.relance.nombre_relance_effectuee
            }
        });

        const savedCompany = await newCompany.save();
        res.status(200).send(savedCompany);
        
    } catch (err) {
        res.status(400).send(err);
    }
};

export const addInvoice = async (req:Request, res:Response) => {
    
    
    res.send('Invoice')
}



