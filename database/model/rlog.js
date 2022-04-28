const Sequelize = require('sequelize');
const sequelize = require('../sequelize.js');
const Resident = require('./resident.js');

const Rlog = sequelize.define(
  'rlog',
  {
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    method: Sequelize.STRING,
    group: Sequelize.STRING,
    members: Sequelize.STRING,
    params: Sequelize.TEXT,
  },
  {
    paranoid: true,
    timestamps: true,
    freezeTableName: true,
  }
);

Rlog.belongsTo(Resident, {
  as: 'userInfo',
  foreignKey: 'userId',
});

Resident.hasMany(Rlog, {
  foreignKey: 'userId',
});

// (async () => {
//   await Rlog.sync({ alter: true });
// })();

module.exports = Rlog;
