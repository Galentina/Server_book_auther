function apiNotFound(req, res) {
  console.log('errorHandler');
  res.status(400).json('API not found');
}

export default function errorHandler(app) {
  app.use(apiNotFound);
}
