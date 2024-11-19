import { Router } from 'express';
import * as companyController from '../Controllers/companyController';
import { upload } from '../middleware/multerConfig';
//import { verifyAdmin } from './utils/verifyToken';

const router = Router();

// Gestion des company
router.get('/getAllCompany', companyController.getAllCompany);
router.get('/getCompanyById/:id', companyController.getCompanyById);

router.post('/addCompany',companyController.addCompany);

router.post('/upload', upload.single('facture'), (req, res) => {
    res.send('fichier upload')
});



export default router;
