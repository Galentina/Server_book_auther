import Author from './Model';
import Book from '../book/Model';

export default async function deleteById(req, res) {
  const { authorId = '' } = req.params;
  console.log('authors', req.params);
  let books = [];
  await Author.findById({ _id: authorId })
    .exec()
    .then((doc) => {
      doc.book = [...doc.book];
      books = doc.book;
      console.log('Book Id is found');
    })
    .catch((err) => {
      console.log('Book Id is not found' + err);
    });
  console.log(books);

  const promisesUpdateBook = books.map((book) =>
    Book.findByIdAndUpdate({ _id: book }, { $pull: { author: authorId } })
      .exec()
      .then((doc) => {
        doc.save().catch((e) => {
          console.log('Author updated error!!!' + e);
        });
        console.log(doc);
      })
      .catch((err) => {
        console.log('Author updated error!!!' + err);
      })
  );
  const promiseResults = await Promise.all(promisesUpdateBook);
  console.log(promiseResults);

  Author.deleteOne({ _id: authorId })
    .then((result) => {
      res.status(200).json(result);
      console.log('authors', req.params);
    })
    .catch((err) => {
      console.log(err, 'delete-author');
      res.status(400).json('Author delete error');
    });
}
