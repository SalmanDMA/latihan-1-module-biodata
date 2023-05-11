const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
 const { name, 'tempat-lahir': place, 'tanggal-lahir': birthOfDate, alamat: address } = req.body;
 if (!name || !place || !birthOfDate || !address) {
  return res.status(400).send('Semua field harus diisi');
 }

 return res.status(200).send({ name, 'tempat-lahir': place, 'tanggal-lahir': birthOfDate, alamat: address });
});

router.get('/', (req, res) => {
 const { name, 'tempat-lahir': place, 'tanggal-lahir': birthOfDate, alamat: address } = req.query;

 if (!name || !place || !birthOfDate || !address) {
  return res.status(400).send('Harap lengkapi parameter URL');
 }

 const biodata = {
  name,
  'tempat-lahir': place,
  'tanggal-lahir': birthOfDate,
  alamat: address,
 };

 return res.status(200).send(biodata);
});

module.exports = router;
