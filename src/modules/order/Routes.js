import { Router } from 'express';
import create from './create';
import search from './search';
import deleteById from './deleteById';
import updateById from './update';

const router = Router();

router.post('/', create); //POST localhost:5000/order/
router.post('/', search); // POST localhost:500/order/search
router.delete('/:orderId', deleteById); // POST localhost:500/order/12354
router.patch('/:orderId', updateById); // POST localhost:500/order/search

export default router;
