import { Router, Request, Response } from 'express';
import * as userController from '../Controllers/userController';
//import { verifyAdmin } from './utils/verifyToken';

const router = Router();

// Gestion du user
router.get('/getAllUsers', userController.getAllUsers);
router.post('/addUser', userController.addUser);
router.get('/testPcDeBureau', (req, res) => {
    res.send('pc de bureau')
})

export default router;
