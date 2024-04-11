import express from 'express';
import { login, getUser, getClients, validateToken, updateClient, registerClient, deleteClient } from '../controllers/userController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/login/:username', login);

router.get('/getUser/:userID', authMiddleware, getUser);

router.get('/verifyToken', validateToken)

router.get('/getAllClients/:accessLevel', authMiddleware, getClients)

router.put('/updateClient', authMiddleware, updateClient);

router.post('/registerClient', authMiddleware, registerClient);

router.delete('/deleteClient/:clientId', authMiddleware, deleteClient);

export default router;