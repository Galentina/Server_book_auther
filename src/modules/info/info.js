const names = [];

export default function info(req, res) {
  names.push(req.body.name);
  console.log('info');
  res.status(200).json(names);
}
