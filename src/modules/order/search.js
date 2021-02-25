import Order from './Model';

export default function search(req, res) {
  Order.find()
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err, 'orders-search');
      res.status(400).json('Order get all error');
    });
}
