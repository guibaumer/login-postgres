import { Router } from 'express';

const router = new Router();

router.get('/', (req, res) => {
    res.send('POMBAL API - HOME');
});

export default router;


