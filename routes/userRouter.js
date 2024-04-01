import { Router } from 'express';
import { CreateUser, FindSession, GetAllUsers, LogUser, Logout, SecuredData } from '../src/controllers/userController.js';

const router = new Router();

router.get('/', GetAllUsers);
router.post('/', CreateUser);
router.post('/login', LogUser);
router.post('/logout', Logout);
router.get('/secured-data', SecuredData);
router.get('/session', FindSession);

export default router;


