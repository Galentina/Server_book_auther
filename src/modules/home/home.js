export default function home(req, res) {
  console.log('home');
  res.status(200).json({
    name: 'PASV',
    components: ['adc', 'qwe', 'tre'],
  });
}
