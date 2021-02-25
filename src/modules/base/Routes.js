import { Router } from 'express';
import create from './create';
import search from './search';
import deleteById from './deleteById';
import updateById from './update';

const router = Router();

router.post('/', create); //POST localhost:5000/base/
router.post('/', search); // POST localhost:500/base/search
router.delete('/:baseId', deleteById); // POST localhost:500/base/12354
router.patch('/:baseId', updateById); // POST localhost:500/base/search

export default router;
