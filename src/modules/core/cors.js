export default function cors(app) {
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Header',
      'Origin, X-Requested-With, Content-Type, Access, Authorization'
    );

    res.header(
      'Access-Control-Allow-Headers',
      'append, delete, entries, foreach, get, has, keys, set, values, Authorization'
    );
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    console.log('cors');

    if (req.method === 'OPTIONS') {
      res.header(
        'Access-Control-Allow-Methods',
        'PUT, POST, PATCH, DELETE, GET'
      );
      console.log('cors');
      return res.status(200).json({});
    }
    next();
  });
}
