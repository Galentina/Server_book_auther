import Author from './Model';
import Book from './../book/Model';
import mongoose from 'mongoose';

export default async function create(req, res) {
  const _id = new mongoose.Types.ObjectId();
  const newAuthor = new Author({
    _id,
    name: req.body.name,
    book: req.body.book,
  });

  // Check books
  const promisesBookGetById = newAuthor.book.map((book) =>
    Book.findByIdAndUpdate({ _id: book }, { $addToSet: { authors: _id } })
      .exec()
      .then((doc) => {
        doc.author = [...doc.author, _id];
        doc.save().catch((e) => {
          console.log('Author updated error!!!' + e);
        });
      })
      .catch((err) => {
        console.log(err);
        // res.status(400).json('Book get all error');
      })
  );
  console.log(promisesBookGetById);

  const promisesResults = await Promise.all(promisesBookGetById);
  console.log(promisesResults);

  newAuthor
    .save()
    .then(() => {
      res.status(200).json('Author created');
    })
    .catch((err) => {
      console.log(err, 'create-author');
      res.status(400).json('Author not created');
    });
}
