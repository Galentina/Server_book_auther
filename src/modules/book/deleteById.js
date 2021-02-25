import Book from './Model';
import Author from '../author/Model';

export default async function deleteById(req, res) {
  const { bookId = '' } = req.params;
  console.log(req.params, 'books');
  let authors = [];
  let orders = true;
  console.log(bookId);
  await Book.findById({ _id: bookId })
    .exec()
    .then((doc) => {
      doc.author = [...doc.author];
      authors = doc.author;
      doc.order = [...doc.order];
      if (doc.order.length !== 0) orders = false;
      console.log('Book Id is found');
    })
    .catch((err) => {
      console.log('Book Id is not found' + err);
    });
  console.log('authors: ', authors);
  console.log('orders: ', orders);

  const promisesUpdateAuthor = authors.map((author) => {
    if (orders === true)
      return Author.findByIdAndUpdate(
        { _id: author },
        {
          $pull: { book: bookId },
        }
      )
        .exec()
        .then((doc) => {
          doc.save().catch((e) => {
            console.log('Author updated error!' + e);
          });
          console.log(doc);
        })
        .catch((err) => {
          console.log('Author updated error!!!' + err);
        });
    else {
      console.log('The book could not be deleted');
      return null;
    }
  });
  const promiseResults = await Promise.all(promisesUpdateAuthor);
  console.log(promiseResults);

  if (orders === true) {
    Book.deleteOne({ _id: bookId })
      .then((result) => {
        res.status(200).json(result);
        console.log('Book is deleted');
      })
      .catch((err) => {
        console.log(err, 'delete-book');
        res.status(400).json('Book delete error');
      });
  } else {
    console.log('it is included in one or more orders.');
    res.status(400).json('it is included in one or more orders.');
  }
}
