import User from './Model';

export default function userDeleteAll(req, res) {
  const userId = req.params.userId;

  User.deleteMany()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err, 'user-delete');
      res.status(400).json('User delete all error');
    });
}
