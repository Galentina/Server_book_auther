import Order from './Model';
import Book from '../book/Model';

export default async function updateById(req, res) {
  const { orderId } = req.params;
  let books = req.body.book;
  // delete req.body.password;

  let oldBooksOrder = [];
  await Order.findById({ _id: orderId })
    .exec()
    .then((doc) => {
      doc.book = [...doc.book];
      oldBooksOrder = doc.book;
      console.log('Order Id is found');
    })
    .catch((err) => {
      console.log('Order Id is not found' + err);
    });
  console.log(oldBooksOrder);

  const promisesUpdateBooks = oldBooksOrder.map((book) =>
    Book.findByIdAndUpdate({ _id: book }, { $pull: { order: orderId } })
      .exec()
      .then((doc) => {
        doc.save().catch((e) => {
          console.log('Order updated err!' + e);
        });
        console.log(doc);
      })
      .catch((err) => {
        console.log('Order updated err!!!' + err);
      })
  );
  const promiseResult = await Promise.all(promisesUpdateBooks);
  console.log(promiseResult);

  const promiseUpdateBook1 = books.map((book) =>
    Book.findByIdAndUpdate({ _id: book }, { $addToSet: { order: orderId } })
      .exec()
      .then((doc) => {
        doc.order = [...doc.order, orderId];
        console.log(doc);
      })
      .catch((err) => {
        console.log('Order updated err!!!' + err);
      })
  );

  const promiseResult1 = await Promise.all(promiseUpdateBook1);
  console.log(promiseResult1);

  Order.updateOne({ _id: orderId }, req.body)
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err, 'orders-update');
      res.status(400).json('User update all error');
    });
}
