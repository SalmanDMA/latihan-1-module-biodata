module.exports = (sequelize, Sequelize) => {
 const profilePesilat = sequelize.define(
  'profile_pesilat',
  {
   nama: {
    type: Sequelize.STRING,
    allowNull: false,
   },
   tempatLahir: {
    type: Sequelize.STRING,
   },
   tanggalLahir: {
    type: Sequelize.DATEONLY,
   },
   alamat: {
    type: Sequelize.STRING,
   },
  },
  {
   freezeTableName: true,
  }
 );
 return profilePesilat;
};
