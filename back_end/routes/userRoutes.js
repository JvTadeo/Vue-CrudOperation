import express from 'express';
import { login, getUser, getClients, validateToken, updateClient, registerClient, deleteClient } from '../controllers/userController.js';

const router = express.Router();

router.get('/login/:username', login);

router.get('/getUser/:userID', getUser);

router.get('/verifyToken', validateToken)

router.get('/getAllClients/:accessLevel', getClients)

router.put('/updateClient', updateClient);

router.post('/registerClient', registerClient);

router.delete('/deleteClient/:clientId', deleteClient);

export default router;