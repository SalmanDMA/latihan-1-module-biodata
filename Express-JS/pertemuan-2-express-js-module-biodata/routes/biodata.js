const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
 const { name, place, birthOfDate, address } = req.body;
 if (!name || !place || !birthOfDate || !address) {
  return res.status(400).send('Semua field harus diisi');
 }

 return res.status(200).send({ name, place, birthOfDate, address });
});

router.get('/', (req, res) => {
 const { name, place, birthOfDate, address } = req.query;
 if (!name || !place || !birthOfDate || !address) {
  return res.status(400).send('Harap lengkapi parameter URL');
 }

 const biodata = { name, place, birthOfDate, address };

 return res.status(200).send(biodata);
});

module.exports = router;
