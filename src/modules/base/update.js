import Base from './Model';

export default function updateById(req, res) {
  const { baseId } = req.params;

  delete req.body.password;

  Base.updateOne({ _id: baseId }, req.body)
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err, 'base-update');
      res.status(400).json('User update all error');
    });
}
