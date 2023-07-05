const express = require('express');
const app = express();
const port = 3001;
const cors = require('cors');

const connectDB = require('./db');
const router = require('./routes/userRoutes');

app.use(cors());
app.options('*', cors());

app.use(express.json());

connectDB().then(() => {
  app.use('/', router);

  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Terjadi kesalahan dalam server');
  });

  app.use((req, res, next) => {
    res.status(404).send('Halaman tidak ditemukan');
  });

  app.listen(port, () => {
    console.log('Server berjalan pada port', port);
  });
});
