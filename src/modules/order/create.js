import Order from './Model';
import mongoose from 'mongoose';
import Book from '../book/Model';

export default async function create(req, res) {
  const _id = new mongoose.Types.ObjectId();
  let allBooks = req.body.book;

  //------Update Books------------

  const promiseBookGetById = allBooks.map((book) =>
    Book.findByIdAndUpdate({ _id: book }, { $addToSet: { order: _id } })
      .exec()
      .then((doc) => {
        doc.order = [...doc.order, _id];
        doc.save().catch((e) => {
          throw new Error(e);
        });
      })
      .catch((err) => {
        console.log(err);
        // res.status(400).json('Book get all error');
      })
  );
  console.log(promiseBookGetById);
  const promiseResults1 = await Promise.all(promiseBookGetById);
  console.log(promiseResults1);

  const newOrder = new Order({
    _id,
    name: req.body.name,
    book: req.body.book,
    status: req.body.status,
  });

  // let bookPrice = sum;

  newOrder
    .save()
    .then(() => {
      res.status(200).json('Order created');
    })
    .catch((err) => {
      console.log(err, 'orders-create');
      res.status(400).json('Order not created');
    });
}
