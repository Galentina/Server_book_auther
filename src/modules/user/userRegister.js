import User from './Model';

export default function userRegister(req, res) {
  const newUser = new User({
    firstname: req.body.firstname,
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  newUser
    .save()
    .then(() => {
      res.status(200).json('User created');
    })
    .catch((err) => {
      console.log(err, 'user-register');
      res.status(400).json('User not created');
    })
    .finally(() => {
      console.log('END');
    });
}
