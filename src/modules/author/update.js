import Author from './Model';
import Book from '../book/Model';

export default async function updateById(req, res) {
  const { authorId } = req.params;
  let books = req.body.book;
  // delete req.body.password;

  let oldBooks = [];
  await Author.findById({ _id: authorId })
    .exec()
    .then((doc) => {
      doc.book = [...doc.book];
      oldBooks = doc.book;
      console.log('Book Id is found');
    })
    .catch((err) => {
      console.log('Book Id is not found' + err);
    });
  console.log(oldBooks);

  const promisesUpdateBook = oldBooks.map((book) =>
    Book.findByIdAndUpdate({ _id: book }, { $pull: { author: authorId } })
      .exec()
      .then((doc) => {
        doc.save().catch((e) => {
          console.log('Order updated err!!!' + e);
        });
        console.log(doc);
      })
      .catch((err) => {
        console.log('Author updated error!!!' + err);
      })
  );
  const promiseResults = await Promise.all(promisesUpdateBook);
  console.log(promiseResults);

  const promisesUpdateBook1 = books.map((book) =>
    Book.findByIdAndUpdate({ _id: book }, { $addToSet: { author: authorId } })
      .exec()
      .then((doc) => {
        doc.author = [...doc.author, authorId];
      })
      .catch((err) => {
        console.log('Author updated error!' + err);
      })
  );
  const promiseResults1 = await Promise.all(promisesUpdateBook1);
  console.log(promiseResults1);

  Author.updateOne({ _id: authorId }, req.body)
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err, 'update-author');
      res.status(400).json('User update all error');
    });
}
