import { Router } from 'express';
import { CreatePigeon, GetAllPigeons, getPigeon } from '../src/controllers/pigeonController.js';
import upload from '../config/multer.js';

// import multer from 'multer';
// const upload = multer({ dest: 'uploads/' });

const router = new Router();

router.post('/', upload.single('photo'), CreatePigeon);

router.get('/', GetAllPigeons);
// router.post('/', CreatePigeon);
// router.put('/edit-pigeon', EditPigeon);
router.post('/get-pigeon-data', getPigeon);

export default router;


