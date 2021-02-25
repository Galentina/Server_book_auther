import Book from './Model';
import Author from './../author/Model';
import mongoose from 'mongoose';

export default async function create(req, res) {
  const _id = new mongoose.Types.ObjectId();
  console.log('im here', req.body);
  const newBook = new Book({
    _id: _id,
    name: req.body.name,
    author: req.body.author,
    order: req.body.order,
    cost: req.body.cost,
    sale: req.body.sale,
    status: req.body.status,
  });
  const promisesUpdateAuthor = newBook.author.map((author) =>
    Author.findByIdAndUpdate({ _id: author }, { $addToSet: { books: _id } })
      .exec()
      .then((doc) => {
        // newAuthors.push(author);
        doc.book = [...doc.book, _id];
        doc.save().catch((e) => {
          throw new Error(e);
        });
      })
      .catch((err) => {
        console.log('Author updated error!' + err);
      })
  );

  const promiseResults1 = await Promise.all(promisesUpdateAuthor);
  console.log(promiseResults1);

  // Create Book
  newBook
    .save()
    .then(() => {
      res.status(200).json('Book created');
    })
    .catch((err) => {
      console.log(err, 'create-book');
      res.status(400).json('Book not created');
    })
    .finally(() => {
      console.log('finally');
    });
}
