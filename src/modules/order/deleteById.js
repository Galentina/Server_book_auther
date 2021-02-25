import Order from './Model';
import Book from '../book/Model';

export default async function deleteById(req, res) {
  const { orderId = '' } = req.params;
  console.log('orders', req.params);
  // ------ take list of boons from Order--------------
  let books = [];
  await Order.findById({ _id: orderId })
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

  // ------ delete order from each book from Order--------------

  const promisesUpdateBook = books.map((book) =>
    Book.findByIdAndUpdate({ _id: book }, { $pull: { order: orderId } })
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

  Order.deleteOne({ _id: orderId })
    .then((result) => {
      res.status(200).json(result);
      console.log('orders', req.params);
    })
    .catch((err) => {
      console.log(err, 'delete-order');
      res.status(400).json('Order delete error');
    });
}
