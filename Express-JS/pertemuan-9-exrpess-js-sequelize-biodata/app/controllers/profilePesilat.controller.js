const db = require('../models');
const profilePesilat = db.profilePesilat;
const Op = db.Sequelize.Op;

// create profile pesilat method
exports.create = (req, res) => {
 if (!req.body.nama) {
  res.status(400).send({
   message: 'Content can not be empty!',
  });
  return;
 }
 // create profile pesilat data
 const dataProfilePesilat = {
  nama: req.body.nama,
  tempatLahir: req.body.tempatLahir,
  tanggalLahir: req.body.tanggalLahir,
  alamat: req.body.alamat,
 };

 // save profile pesilat in the database
 profilePesilat
  .create(dataProfilePesilat)
  .then((data) => {
   res.send(data);
  })
  .catch((err) => {
   res.status(500).send({
    message: 'Error occured while inserting data' || err.message,
   });
  });
};

// retrive all profile pesilat from database
exports.findAll = (req, res) => {
 profilePesilat
  .findAll()
  .then((data) => {
   res.send(data);
  })
  .catch((err) => {
   res.status(500).send({
    message: 'Error occured while retrieving data' || err.message,
   });
  });
};

// find a single profile pesilat with an id
exports.findOne = (req, res) => {
 profilePesilat
  .findOne({
   where: {
    id: req.params.id,
   },
  })
  .then((data) => {
   if (data === null) {
    res.status(404).send({
     message: 'Profile pesilat not found',
    });
   } else {
    res.send(data);
   }
  })
  .catch((err) => {
   res.status(500).send({
    message: 'Error occurred while finding data' || err.message,
   });
  });
};

// update a profile pesilat with an id
exports.update = (req, res) => {
 profilePesilat
  .update(req.body, {
   where: {
    id: req.params.id,
   },
  })
  .then((result) => {
   console.log(result);
   if (result[0] === 1) {
    if (!req.body.nama || !req.body.tempatLahir || !req.body.tanggalLahir || !req.body.alamat) {
     res.status(400).send({
      message: 'Content can not be empty!',
     });
     return;
    } else {
     res.send({
      message: 'Profile pesilat updated successfully.',
      data: req.body,
     });
    }
   } else {
    res.status(404).send({
     message: 'Profile pesilat not found!',
    });
   }
  })
  .catch((err) => {
   res.status(500).send({
    message: err.message || 'Error occurred while updating data.',
   });
  });
};

// update only one field a profile pesilat with an id
exports.patch = (req, res) => {
 profilePesilat
  .findOne({
   where: {
    id: req.params.id,
   },
  })
  .then((data) => {
   if (req.body.nama) {
    data.nama = req.body.nama;
   }
   if (req.body.tempatLahir) {
    data.tempatLahir = req.body.tempatLahir;
   }
   if (req.body.tanggalLahir) {
    data.tanggalLahir = req.body.tanggalLahir;
   }
   if (req.body.alamat) {
    data.alamat = req.body.alamat;
   }
   res.send({
    message: 'Profile pesilat updated successfully.',
    data: data,
   });
  })
  .catch((err) => {
   res.status(500).send({
    message: err.message || 'Error occurred while updating data.',
   });
  });
};

// delete a profile pesilat with an id
exports.delete = (req, res) => {
 profilePesilat
  .destroy({
   where: {
    id: req.params.id,
   },
  })
  .then((result) => {
   console.log(result);
   if (result === 1) {
    res.send({
     message: 'Profile pesilat deleted successfully.',
    });
   } else {
    res.status(404).send({
     message: 'Profile pesilat not found!',
    });
   }
  })
  .catch((err) => {
   res.status(500).send({
    message: err.message || 'Error occurred while deleting data.',
   });
  });
};
