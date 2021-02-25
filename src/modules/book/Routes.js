import { Router } from 'express';
import create from './create';
import search from './search';
import deleteById from './deleteById';
import updateById from './update';

const router = Router();

router.post('/search', search); // POST localhost:500/book/search
router.post('/', create); //POST localhost:5000/book/
router.delete('/:bookId', deleteById); // POST localhost:500/book/12354
router.patch('/:bookId', updateById); // POST localhost:500/book/search

export default router;
