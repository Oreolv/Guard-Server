const Sequelize = require('sequelize');
const sequelize = require('../sequelize.js');
const Users = require('./users');

const Tips = sequelize.define(
  'tips',
  {
    tipsId: {
      type: Sequelize.STRING,
      unique: true,
    },
    type: Sequelize.STRING,
    title: Sequelize.STRING,
    content: Sequelize.TEXT('long'),
    source: Sequelize.TEXT,
    sourceURL: Sequelize.STRING,
    publisher: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    publishTime: Sequelize.DATE,
  },
  {
    paranoid: true,
    timestamps: true,
    freezeTableName: true,
  }
);

Tips.belongsTo(Users, {
  as: 'publisherInfo',
  foreignKey: 'publisher',
});
Users.hasMany(Tips, {
  foreignKey: 'publisher',
});

(async () => {
  await Tips.sync({ alter: true });
})();

module.exports = Tips;
