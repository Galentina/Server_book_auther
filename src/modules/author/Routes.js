import { Router } from 'express';
import create from './create';
import search from './search';
import deleteById from './deleteById';
import updateById from './update';

const router = Router();

router.post('/', create); //POST localhost:5000/author/
router.post('/search', search); // POST localhost:500/author/search
router.delete('/:authorId', deleteById); // POST localhost:500/author/12354
router.patch('/:authorId', updateById); // POST localhost:500/author/search

export default router;
