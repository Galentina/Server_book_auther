import Book from './Model';
import Author from '../author/Model';

export default async function updateById(req, res) {
  const { bookId } = req.params;
  // delete req.body.password;
  let newAuthors = req.body.author;
  console.log(newAuthors);

  let oldAuthors = [];
  await Book.findById({ _id: bookId })
    .exec()
    .then((doc) => {
      doc.author = [...doc.author];
      oldAuthors = doc.author;
      console.log('Book Id is found');
    })
    .catch((err) => {
      console.log('Book Id is not found' + err);
    });
  console.log(oldAuthors);

  const promisesUpdateAuthor = oldAuthors.map((author) =>
    Author.findByIdAndUpdate({ _id: author }, { $pull: { book: bookId } })
      .exec()
      .then((doc) => {
        doc.save().catch((e) => {
          throw new Error(e);
        });
        console.log(doc);
      })
      .catch((err) => {
        console.log('Author updated error!!!' + err);
      })
  );
  const promiseResults = await Promise.all(promisesUpdateAuthor);
  console.log(promiseResults);

  const promisesUpdateAuthor1 = req.body.author.map((author) =>
    Author.findByIdAndUpdate({ _id: author }, { $addToSet: { book: bookId } })
      .exec()
      .then((doc) => {
        doc.book = [...doc.book, bookId];
        console.log(doc);
      })
      .catch((err) => {
        console.log('Author updated error!!!' + err);
      })
  );
  const promiseResults1 = await Promise.all(promisesUpdateAuthor1);
  console.log(promiseResults1);

  //---------------------------------------------------------

  Book.updateOne({ _id: bookId }, req.body)
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err, 'update-book');
      res.status(400).json('User update all error');
    });
}
